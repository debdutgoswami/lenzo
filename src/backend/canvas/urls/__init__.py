from .room import urlpatterns as room_urlpatterns
from .profile import urlpatterns as profile_urlpatterns

urlpatterns = room_urlpatterns + profile_urlpatterns
