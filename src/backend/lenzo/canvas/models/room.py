from django.db import models
from django.conf import settings
from django.utils import timezone


# Create your models here.
class Room(models.Model):
    """
    Room ORM
    """

    host = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="hosted",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="participated", blank=True
    )

    id = models.CharField(max_length=14, primary_key=True, editable=False, unique=True)
    name = models.CharField("Room Name", max_length=30, blank=False, null=False)
    created_at = models.DateTimeField(
        "Created At", default=timezone.now, blank=False, null=False
    )
    is_live = models.BooleanField("Live", default=False, blank=False, null=False)
    duration = models.IntegerField(
        "Duration (in sec)", default=0, blank=False, null=False
    )
    start_time = models.DateTimeField("Start Time", blank=True, null=True)
    end_time = models.DateTimeField("End Time", blank=True, null=True)

    def __str__(self):
        return f"<Room(Name={self.name}, Host={self.host.username})>"
