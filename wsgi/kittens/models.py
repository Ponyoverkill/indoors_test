from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Breed(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class WoolType(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Kitten(models.Model):
    name = models.CharField(max_length=255, null=False)
    breed = models.ForeignKey(Breed, on_delete=models.PROTECT, null=True)
    birth_date = models.DateField()
    wool_type = models.ForeignKey(WoolType, on_delete=models.PROTECT, null=True)
    info = models.TextField(blank=True)
    owner = models.ForeignKey(User, verbose_name='Хозяин', on_delete=models.CASCADE)
    photo = models.CharField(max_length=512, null=False)

    def __str__(self):
        return self.name

