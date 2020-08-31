from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from concordance_api import views

router = routers.DefaultRouter()

router.register('endata', views.EnDataAPI)
router.register('vndata', views.VnDataAPI)
router.register('ensentence', views.EnSentenceAPI)
router.register('vnsentence', views.VnSentenceAPI)
router.register('user', views.UserAPI)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/upload/', views.FileUploadView.as_view()),
    path('api/search/', views.Search.as_view()),
    path('api/detail/', views.DetailSentence.as_view()),
    path('api/statistic/', views.Statistics.as_view()),
    path('api/totalstatistics/', views.TotalStatistics.as_view()),
    path('api/edit/', views.EditDataRaw.as_view()),
]
