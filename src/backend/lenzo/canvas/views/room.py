from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Room
from ..serializers import RoomSerializer


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
