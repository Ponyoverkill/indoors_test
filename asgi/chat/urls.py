from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.RoomAPIView.as_view(), name='room'),
]
