from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import *
from django.utils.encoding import smart_str
from re import findall, sub
from contextlib import closing
from django.db import connection


class EndataListView(viewsets.ModelViewSet):
    serializer_class = EndataSerializer
    queryset = Endata.objects.all()

    @action(detail=False, methods=['post'])
    def upload(self, request, format=None):
        data = smart_str(sub(b'\xef\xbb\xbf',  b'',    request.FILES['filename'].read(
        )), encoding='utf-8', strings_only=False, errors='strict').splitlines()
        pattern = r'(ED)(\d{6})(\d{2})(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))'
        sql = 'INSERT INTO EnData VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        params = []
        for line in data:
            field = findall(pattern, line)[0]
            if len(field) != 12:
                return Response("file format wrong",status=404)
            params.append(field)
        with closing(connection.cursor()) as cursor:
            cursor.executemany(sql, params)
        return Response(status=204)
    
    @action(detail=False, methods=['get'])
    def sentence(self,request):
        result = []
        for i in range(1,10):
            result.append(self.queryset.filter(sentence_id=i)) 
        return Response(result,status=204)


class VndataAPI(viewsets.ModelViewSet):
    serializer_class = VndataSerializer
    queryset = Vndata.objects.all()

    @action(detail=False, methods=['post'])
    def upload(self, request, format=None):
        data = smart_str(sub(b'\xef\xbb\xbf',  b'',    request.FILES['filename'].read(
        )), encoding='utf-8', strings_only=False, errors='strict').splitlines()
        pattern = r'(ED|VD|KD|CD)(\d{6})(\d{2})(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))(?:\t(\S+))'
        sql = 'INSERT INTO VnData VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        params = []
        for line in data:
            field = findall(pattern, line)[0]
            if len(field) != 12:
                return Response("file format wrong",status=404)
            params.append(field)
        with closing(connection.cursor()) as cursor:
            cursor.executemany(sql, params)
        return Response(status=204)
