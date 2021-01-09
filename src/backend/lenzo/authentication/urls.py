from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
    ObtainCustomTokenPair,
    CreateCustomUser,
    LogoutAndBlacklist,
    StatusAccessToken,
)

urlpatterns = [
    path("logout", LogoutAndBlacklist.as_view(), name="blacklist_token"),
    path("user/create", CreateCustomUser.as_view(), name="user_create"),
    path("token/obtain", ObtainCustomTokenPair.as_view(), name="token_create"),
    path("token/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("token/is_active", StatusAccessToken.as_view(), name="token_is_active"),
]
