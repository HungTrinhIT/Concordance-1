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