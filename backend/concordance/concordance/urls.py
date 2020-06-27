from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from concordance_api import views

router = routers.DefaultRouter()

router.register('endata', views.EndataAPI)
router.register('vndata', views.VndataAPI)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
