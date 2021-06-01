from django.contrib import admin
from canvas.models import *


class RoomAdmin(admin.ModelAdmin):
    """
    Room Interface in Admin Page
    """

    list_display = [
        "id",
        "name",
        "host",
        "created_at",
        "is_live",
        "duration",
        "start_time",
        "end_time",
    ]


admin.site.register(Room, RoomAdmin)
