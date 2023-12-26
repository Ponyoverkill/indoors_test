from django.urls import path

from . import views

urlpatterns = [
    # path('test/', views.test),
    path('<int:pk>/', views.RoomAPIView.as_view(), name='room'),
    # path('', views.index, name='index'),
]
