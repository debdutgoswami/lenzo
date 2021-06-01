from django.urls import path
from canvas.views import GetProfile, UpdateProfile

urlpatterns = [
    path("profile", GetProfile.as_view(), name="get_profile"),
    path("profile/update", UpdateProfile.as_view(), name="update_profile"),
]
