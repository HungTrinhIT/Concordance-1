from rest_framework import serializers
from .models import *


class EndataSerializer(serializers.ModelSerializer):
    class Meta:
        model=Endata
        fields = "__all__"

class VndataSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vndata
        fields = "__all__"

class VnsentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vnsentence
        fields = "__all__"

class EnsentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ensentence
        fields = "__all__"