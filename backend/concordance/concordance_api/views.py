from rest_framework import viewsets, status, views
from rest_framework.decorators import action, parser_classes
from rest_framework.response import Response
from .serializers import *
from django.utils.encoding import smart_str
from re import findall, split
from contextlib import closing
from django.db import connection
from rest_framework.parsers import MultiPartParser
from concordance.pagination import RawDataPagination, SentenceDataPagination
import json
from .lemma import wordToLemma
from .help import getListSentence
import math
from django.http import QueryDict


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        data = smart_str(request.FILES['filename'].read(
        ), encoding='utf-8', strings_only=False, errors='strict')
        lang = request.POST['lang']
        if not lang:
            Response("missing parameter", status=404)

        pattern = r'(ED|VD)(\d{6})(\d{2})(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))'
        sql = 'INSERT INTO {}Data (lang, sentence_id, word_id, word, lemma, links, morpho, pos, phrase, grm, ner, semantic) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'.format(
            lang.capitalize())
        sql1 = 'INSERT INTO {}Sentence (sentence_id, sentence) VALUES (%s,%s)'.format(
            lang.capitalize())

        list_field = findall(pattern, data)

        newlist = getListSentence(list_field)

        with closing(connection.cursor()) as cursor:
            cursor.executemany(sql, list_field)
            cursor.executemany(sql1, newlist)

        return Response(status=204)


class TotalStatistics(views.APIView):
    def get(self, request, format=None):
        sql = "select * from TotalStatistics"
        with closing(connection.cursor()) as cursor:
            cursor.execute(sql)
            return Response(cursor,status=200)


class EditDataRaw(views.APIView):
    def put(self, request, format=None):
        put = QueryDict(request.body)
        id = put.get("id")
        lang = put.get("lang")
        sql = "UPDATE {}Data".format(lang.capitalize())
        for i in put:
            if i == "id" or i == 'lang':
                continue
            if "'" in put[i]:
                sql += " SET {}=\"{}\"".format(i, put[i])
            else:
                sql += " SET {}='{}'".format(i, put[i]) 
        
        sql += " where id="+id
        with closing(connection.cursor()) as cursor:
            cursor.execute(sql)
        return Response(status=200)


class Statistics(views.APIView):
    def get(self, request, format=None):
        req = request.GET
        lang = req.get('lang')
        ner = req.get('ner')
        pos = req.get('pos')
        semantic = req.get('semantic')
        size = req.get('size')
        sql = "select word, sum(count) as count from {}Statistics".format(lang.capitalize())
        sql1 = "select * from TotalStatistics"
        if ner:
            sql += " where ner='"+ner+"'"
        if pos:
            sql += " where pos='"+pos+"'"
        if semantic:
            sql += " where semantic='"+semantic+"'"
        sql += " group by word order by count desc"
        if size:
            sql += " limit " + size
        
        temp = None
        result = []
        with closing(connection.cursor()) as cursor:
            cursor.execute(sql1)
            total = cursor.fetchall()
            cursor.execute(sql)
            temp = cursor.fetchall()
        for item in temp:
            result.append({
                "word":item[0],
                "count": item[1],
                "percent": round(item[1] / total[1][1],2),
                "F": round(-math.log(item[1]/total[1][1]),2)
            })
        return Response(result, status=200)


class DetailSentence(views.APIView):
    def get(self, request, format=None):
        req = request.GET

        id = req.get("id")
        lang = req.get('lang')

        check = ['en', 'vn']
        if lang not in check:
            return Response("client request error", 400)

        check.remove(lang)

        sql = "select * from {}Data where sentence_id = %s"

        result = {}

        with closing(connection.cursor()) as cursor:
            cursor.execute(sql.format(lang.capitalize()), [id])
            result['source'] = cursor.fetchall()

            cursor.execute(sql.format(check[0].capitalize()), [id])
            result['target'] = cursor.fetchall()

        return Response(result, 200)


class Search(views.APIView):
    def get(self, request, format=None):
        req = request.GET
        keyword = req.get('q').lower().strip()
        lang = req.get('lang')
        qt = req.get('qt')
        pos = req.get('pos')
        ner = req.get('ner')

        check = ['en', 'vn']

        if not keyword:
            return Response("missing keyword", 400)

        if lang not in check:
            return Response("client request error", 400)

        check.remove(lang)

        if qt == 'mat':
            sql = "select sentence_id ,word, links from {}Data where binary word = binary %s ".format(
            lang.capitalize())
        else:
            keyword = wordToLemma(keyword, lang)
            sql = "select sentence_id ,word, links from {}Data where lemma = %s ".format(
                lang.capitalize())

        values = [keyword]

        if pos:
            sql += "AND pos=%s "
            values.append(pos)

        if ner:
            sql += "AND ner=%s"
            values.append(ner)
        sql += "order by id"
        with closing(connection.cursor()) as cursor:
            cursor.execute(sql, values)
            temp1 = cursor.fetchall()

        id_results = []
        temp = []
        for item in temp1:
            if item[0] not in id_results:
                id_results.append(item[0])
                temp.append(item)
        result = {
            "source": [],
            "target": []
        }

        if id_results:

            sql = "select sentence from {}Sentence where sentence_id in %s order by id"

            with closing(connection.cursor()) as cursor:
                cursor.execute(sql.format(lang.capitalize()), [id_results])
                source = cursor.fetchall()
                cursor.execute(sql.format(check[0].capitalize()), [id_results])
                target = cursor.fetchall()
            for i, v in enumerate(source):
                check = findall("(^{} | {} | {}$)".format(temp[i][1],temp[i][1],temp[i][1]), v[0])[0]
                hold = v[0].split(check, 1)
                result['source'].append({"key": temp[i][1], "left": hold[0], "right": hold[1], "sentence_id": temp[i][0], "lang": lang})
                key = temp[i][2]
                if not key.isnumeric():
                    key = ""
                    left = ""
                    right = target[i][0]
                else:
                    hold = target[i][0].split(" ")
                    if int(key) not in range(1, len(hold)+1):
                        key = ""
                        left = ""
                        right = target[i][0]
                    else:
                        key = key.split(",")
                        key = " ".join(hold[int(key[0])-1:int(key[-1])])
                        hold = target[i][0].split(key)
                        left = hold[0]
                        right = hold[1]
                result['target'].append(
                    {"key": key, "left": left, "right": right, "sentence_id": temp[i][0], "lang": check[0]})

        return Response(result, 200)


class EnDataAPI(viewsets.ModelViewSet):
    serializer_class = EndataSerializer
    queryset = Endata.objects.all()
    pagination_class = RawDataPagination


class EnSentenceAPI(viewsets.ModelViewSet):
    serializer_class = EnsentenceSerializer
    queryset = Ensentence.objects.all()
    pagination_class = SentenceDataPagination


class VnSentenceAPI(viewsets.ModelViewSet):
    serializer_class = VnsentenceSerializer
    queryset = Vnsentence.objects.all()
    pagination_class = SentenceDataPagination


class VnDataAPI(viewsets.ModelViewSet):
    serializer_class = VndataSerializer
    queryset = Vndata.objects.all()
    pagination_class = RawDataPagination
