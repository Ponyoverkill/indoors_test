from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, unique=True)
    first_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="first_user", blank=False)
    second_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="second_user", blank=False)

    def __str__(self):
        return f"Room({self.name})"


class Message(models.Model):
    room = models.ForeignKey("chat.Room", on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message({self.user} {self.room})"