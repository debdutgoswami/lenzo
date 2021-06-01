from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.serializers import TokenObtainSerializer, AuthUserSerializer

# Create your views here.


class ObtainCustomTokenPair(TokenObtainPairView):
    serializer_class = TokenObtainSerializer


class CreateCustomUser(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=AuthUserSerializer)
    def post(self, request):
        serializer = AuthUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(
                    data={"status": "OK", "message": json},
                    status=status.HTTP_201_CREATED,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklist(APIView):
    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StatusAccessToken(APIView):
    """
    Simply Returns a JSON showing status of the Access Token
    """

    def get(self, request):
        # by default the routes are protected
        return Response(
            data={
                "status": "OK",
                "message": "Access Token is valid",
            },
            status=status.HTTP_200_OK,
        )
