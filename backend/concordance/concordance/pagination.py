from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class RawDataPagination(PageNumberPagination):
    page = 1
    page_size = 100

class SentenceDataPagination(PageNumberPagination):
    page = 1
    page_size = 10
