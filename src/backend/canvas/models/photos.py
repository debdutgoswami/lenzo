from django.db import models

from canvas.models.room import Room


class RoomPhotos(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="photos")
    image = models.FileField(upload_to="photos")
