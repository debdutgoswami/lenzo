from django.urls import path
from ..views import GetRoom, CreateRoom, UpdateRoom

urlpatterns = [
    path("room/create", CreateRoom.as_view(), name="create_room"),
    path("room/<str:id>", GetRoom.as_view(), name="get_room"),
    path("room/<str:id>/update", UpdateRoom.as_view(), name="update_room"),
]
