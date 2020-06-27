# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Endata(models.Model):
    lang = models.CharField(primary_key=True, max_length=2)
    sentence_id = models.CharField(max_length=6)
    word_id = models.CharField(max_length=2)
    word = models.CharField(max_length=100)
    lemma = models.CharField(max_length=100)
    links = models.CharField(max_length=100, blank=True, null=True)
    morpho = models.CharField(max_length=100, blank=True, null=True)
    pos = models.CharField(max_length=10, blank=True, null=True)
    phrase = models.CharField(max_length=100, blank=True, null=True)
    grm = models.CharField(max_length=100, blank=True, null=True)
    ner = models.CharField(max_length=20, blank=True, null=True)
    semantic = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'EnData'
        unique_together = (('lang', 'sentence_id', 'word_id'),)


class Vndata(models.Model):
    lang = models.CharField(primary_key=True, max_length=2)
    sentence_id = models.CharField(max_length=6)
    word_id = models.CharField(max_length=2)
    word = models.CharField(max_length=100)
    lemma = models.CharField(max_length=100)
    links = models.CharField(max_length=100, blank=True, null=True)
    morpho = models.CharField(max_length=100, blank=True, null=True)
    pos = models.CharField(max_length=10, blank=True, null=True)
    phrase = models.CharField(max_length=100, blank=True, null=True)
    grm = models.CharField(max_length=100, blank=True, null=True)
    ner = models.CharField(max_length=20, blank=True, null=True)
    semantic = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'VnData'
        unique_together = (('lang', 'sentence_id', 'word_id'),)
