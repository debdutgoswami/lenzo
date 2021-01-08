from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import TokenObtainSerializer, CustomUserSerializer

# Create your views here.


class ObtainCustomTokenPair(TokenObtainPairView):
    serializer_class = TokenObtainSerializer


class CreateCustomUser(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
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
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class HelloWorldProtected(APIView):
    def get(self, request):
        print(type(request.user))
        # by default the routes are protected
        return Response(
            data={"message": "hello from protected"}, status=status.HTTP_200_OK
        )
