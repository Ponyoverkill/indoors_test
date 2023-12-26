import datetime

from django.contrib.auth.models import User
from django.templatetags.static import static
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import InMemoryUploadedFile

from rest_framework import serializers
from rest_framework.fields import empty

from .models import Kitten, Breed, WoolType


class KittenCSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    photo = serializers.ImageField(required=True)

    def create(self, validated_data):
        if not isinstance(validated_data['photo'], InMemoryUploadedFile):
            raise serializers.ValidationError("photo must be file")
        filename = f"{datetime.datetime.now().date()}_{validated_data['photo'].name}"
        FileSystemStorage(location="./kittens/static/images").save(
            filename,
            validated_data['photo']
        )

        validated_data['photo'] = static(f"./images/{filename}")

        return super().create(validated_data)

    class Meta:
        model = Kitten
        fields = '__all__'


class KittenUSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    photo = serializers.ImageField(required=False)

    def update(self, instance, validated_data):
        print('here!')
        instance.name = validated_data.get("name", instance.name)
        instance.breed = validated_data.get("breed", instance.breed)
        instance.birth_date = validated_data.get("birth_date", instance.birth_date)
        instance.wool_type = validated_data.get("wool_type", instance.wool_type)
        instance.info = validated_data.get("info", instance.info)
        photo = validated_data.get("photo", instance.photo)
        if isinstance(photo, InMemoryUploadedFile):
            filename = f"{datetime.datetime.now().date()}_{validated_data['photo'].name}"
            FileSystemStorage(location="./kittens/static/images").save(
                filename,
                validated_data['photo']
            )
            instance.photo = static(f"./images/{filename}")

        instance.save()
        return instance

    class Meta:
        model = Kitten
        fields = '__all__'


class KittenDestroySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Kitten
        fields = '__all__'


class KittenRLSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kitten
        fields = '__all__'


class WoolTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WoolType
        fields = '__all__'


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'


class UserCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
