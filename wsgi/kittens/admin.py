from django.contrib import admin

from .models import Kitten, Breed, WoolType

# Register your models here.
admin.site.register(Kitten)
admin.site.register(Breed)
admin.site.register(WoolType)

