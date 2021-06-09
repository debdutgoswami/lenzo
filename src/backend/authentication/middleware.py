import jwt
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError


@database_sync_to_async
def get_user(user_id):
    """
    Gets the User from the Database
    """
    User = get_user_model()
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware:
    """
    Custom middleware that takes user IDs from the query string.
    """

    def __init__(self, inner):
        # Store the ASGI application we were passed
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        if scope.get("user"):
            return await self.inner(scope, receive, send)
        token = parse_qs(scope["query_string"].decode())["token"][0]
        try:
            AccessToken(token).verify()
        except TokenError:
            scope["user"] = AnonymousUser()
            return await self.inner(scope, receive, send)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        scope["user"] = await get_user(int(payload["user_id"]))
        return await self.inner(scope, receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(inner)
