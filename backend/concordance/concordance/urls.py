from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from concordance_api import views

router = routers.DefaultRouter()

router.register('endata', views.EnDataAPI)
router.register('vndata', views.VnDataAPI)
router.register('ensentence', views.EnSentenceAPI)
router.register('vnsentence', views.VnSentenceAPI)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/upload/', views.FileUploadView.as_view()),
    path('api/search/', views.Search.as_view()),
    path('api/detail/', views.DetailSentence.as_view())
]
