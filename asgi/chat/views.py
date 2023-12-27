from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Room
from .serializers import RoomSerializer


class RoomAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Room.objects.all()

    def get(self, request, pk):
        from_user = get_object_or_404(User, pk=request.user.id)
        to_user = get_object_or_404(User, pk=pk)

        room = Room.objects.filter(name=f'{from_user.pk}_{to_user.pk}')
        if room.exists():
            return Response(RoomSerializer(room.first()).data)
        else:
            room = Room.objects.filter(name=f'{to_user.pk}_{from_user.pk}')
            if room.exists():
                return Response(RoomSerializer(room.first()).data)
            else:
                room = Room.objects.create(name=f'{from_user.pk}_{to_user.pk}', first_user=from_user, second_user=to_user)
                return Response(RoomSerializer(room).data)


