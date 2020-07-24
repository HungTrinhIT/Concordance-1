from rest_framework import viewsets, status, views
from rest_framework.decorators import action, parser_classes
from rest_framework.response import Response
from .serializers import *
from django.utils.encoding import smart_str
from re import findall
from contextlib import closing
from django.db import connection
from rest_framework.parsers import MultiPartParser
from concordance.pagination import RawDataPagination, SentenceDataPagination
import json
from .lemma import vnLemma


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        data = smart_str(request.FILES['filename'].read(
        ), encoding='utf-8', strings_only=False, errors='strict')
        lang = request.GET.get('lang')

        if not lang:
            Response("missing parameter", status=404)

        pattern = r'(ED|VD)(\d{6})(\d{2})(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))'
        sql = 'INSERT INTO {}Data VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'.format(
            lang.capitalize())
        sql1 = 'INSERT INTO {}Sentence VALUES (%s,%s)'.format(
            lang.capitalize())
        list_field = findall(pattern, data)
        newlist, dicpos = [], {}
        for item in list_field:
            if item[1] in dicpos:
                newlist[dicpos[item[1]]][1].append(item[3])
            else:
                newlist.append([item[1], [item[3]]])
                dicpos[item[1]] = len(dicpos)
        for i in range(len(newlist)):
            newlist[i][1] = " ".join(newlist[i][1])
        with closing(connection.cursor()) as cursor:
            cursor.executemany(sql, list_field)
            cursor.executemany(sql1, newlist)
        return Response(status=204)


def wordToLemma(word, lang):
    if lang == "en":
        word += " "
        with open('static/english_morpho.json',) as f:
            data = json.load(f)     
        if not data.get(word):
            return word
        return data[word]
    return vnLemma(word)


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
        pos = req.get('pos')
        ner = req.get('ner')

        check = ['en', 'vn']

        if not keyword:
            return Response("missing keyword", 400)

        if lang not in check:
            return Response("client request error", 400)

        check.remove(lang)

        keyword = wordToLemma(keyword, lang)

        sql = "select sentence_id ,word, links from {}Data where lemma = %s".format(
            lang.capitalize())

        values = [keyword]

        if pos:
            sql += "AND pos=%s "
            values.append(pos)

        if ner:
            sql += "AND ner=%s"
            values.append(ner)

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

            sql = "select sentence from {}Sentence where sentence_id in %s"

            with closing(connection.cursor()) as cursor:
                cursor.execute(sql.format(lang.capitalize()), [id_results])
                source = cursor.fetchall()
                cursor.execute(sql.format(check[0].capitalize()), [id_results])
                target = cursor.fetchall()

            for i, v in enumerate(source):
                hold = v[0].split(" "+temp[i][1]+ " ",1)
                result['source'].append({"key": temp[i][1], "left": hold[0],
                                        "right": hold[1], "sentence_id": temp[i][0], "lang": lang})
                key = temp[i][2]
                if key == "-":
                    key = ""
                    left = ""
                    right = target[i][0]
                else:
                    hold = target[i][0].split(" ")
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
