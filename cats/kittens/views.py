from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, mixins, generics
# Create your views here.
from rest_framework.viewsets import GenericViewSet

from .models import Kitten, Breed, WoolType
from .serializers import KittenCSerializer, KittenUSerializer, KittenRLSerializer, KittenDestroySerializer, \
    BreedSerializer, WoolTypeSerializer, User, UserCreateSerializer, \
    UserRetrieveSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


class MultiSerializerViewSet(viewsets.ModelViewSet):
    serializers = {
        'default': None,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers['default'])


class KittenViewSet(MultiSerializerViewSet):
    queryset = Kitten.objects.all()
    permission_classes = (IsOwnerOrReadOnly, )
    serializers = {
        'default': KittenRLSerializer,
        'list':    KittenRLSerializer,
        'retrieve': KittenRLSerializer,
        'update': KittenUSerializer,
        'create': KittenCSerializer,
        'destroy': KittenDestroySerializer,
    }

    def update(self, request, *args, **kwargs):
        print(request.data)
        return super().update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)


class BreedViewSet(viewsets.ModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    permission_classes = (IsAdminOrReadOnly,)


class WoolTypeViewSet(viewsets.ModelViewSet):
    queryset = WoolType.objects.all()
    serializer_class = WoolTypeSerializer
    permission_classes = (IsAdminOrReadOnly,)


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserRetrieveSerializer


class MyKittensViewSet(MultiSerializerViewSet):
    queryset = Kitten.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializers = {
        'default': KittenRLSerializer,
        'list': KittenRLSerializer,
        'retrieve': KittenRLSerializer,
        'update': KittenUSerializer,
        'create': KittenCSerializer,
        'destroy': KittenDestroySerializer,
    }

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user.id)
