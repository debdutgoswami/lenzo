from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from canvas.models import Room, RoomPhotos
from canvas.serializers import RoomSerializer, ImageSerializer


# Create your views here.
class GetRoom(APIView):
    """
    View Room API View
    """

    # permission_classes = (permissions.AllowAny,)

    def get(self, request, **kwargs):
        """
        GET request handler
        """
        try:
            room_obj = Room.objects.get(pk=kwargs["id"])
            room_data = RoomSerializer(instance=room_obj).data
            return Response(
                data={"status": "OK", "message": room_data}, status=status.HTTP_200_OK
            )
        except Room.DoesNotExist:
            return Response(
                data={
                    "status": "ERROR",
                    "message": "Room Does Not Exists",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class CreateRoom(APIView):
    """
    Create Room API View
    """

    @swagger_auto_schema(request_body=RoomSerializer)
    def post(self, request, **kwargs):
        """
        POST request handler
        """
        serializer = RoomSerializer(data=request.data, host=request.user)
        if serializer.is_valid():
            room_obj = serializer.save()
            if room_obj:
                json = serializer.data
                return Response(
                    data={"status": "OK", "message": json},
                    status=status.HTTP_201_CREATED,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateRoom(APIView):
    """
    Update Room API View
    """

    @swagger_auto_schema(request_body=RoomSerializer)
    def put(self, request, **kwargs):
        """
        UPDATE request handler
        """
        try:
            room_obj: Room = Room.objects.get(pk=kwargs["id"])
            if room_obj.host != request.user:
                return Response(
                    data={
                        "status": "ERROR",
                        "message": f"{request.user.username} is not the host",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = RoomSerializer(
                instance=room_obj, data=request.data, partial=True
            )
            if serializer.is_valid():
                room_obj = serializer.save()
            if room_obj:
                json = serializer.data
                return Response(
                    data={"status": "OK", "message": json},
                    status=status.HTTP_202_ACCEPTED,
                )
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response(
                data={
                    "status": "ERROR",
                    "message": "Room Does Not Exists",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class UploadRoomPhoto(APIView):
    def put(self, request: Request, **kwargs):
        try:
            room_obj: Room = Room.objects.get(pk=kwargs["id"])
            if room_obj.host != request.user:
                return Response(
                    data={
                        "status": "ERROR",
                        "message": f"{request.user.username} is not the host",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            image_serializer = ImageSerializer(data=request.data)
            if not image_serializer.is_valid():
                return Response(
                    data=image_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            room_photos = RoomPhotos(room=room_obj, image=image_serializer.file)
            room_photos.save()
            return Response(
                data={
                    "status": "OK",
                    "message": f"Image successfully stored at {room_photos.image}"
                },
                status=status.HTTP_201_CREATED,
            )
        except Room.DoesNotExist:
            return Response(
                data={
                    "status": "ERROR",
                    "message": "Room Does Not Exists",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except KeyError:
            return Response(
                data={
                    "status": "ERROR",
                    "message": "File not passed with request",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
