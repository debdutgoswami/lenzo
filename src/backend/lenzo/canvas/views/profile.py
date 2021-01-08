from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import ProfileSerializer


class GetProfile(APIView):
    """
    Get Profile Info
    """

    def get(self, request, **kwargs):
        """
        GET Request Handler
        """
        profile_obj = request.user
        profile_data = ProfileSerializer(instance=profile_obj).data
        return Response(
            data={"status": "OK", "message": profile_data}, status=status.HTTP_200_OK
        )


class UpdateProfile(APIView):
    """
    Update Profile Info
    """

    def put(self, request, **kwargs):
        """
        PUT Request Handler
        """
        serializer = ProfileSerializer(
            instance=request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            profile_obj = serializer.save()
        if profile_obj:
            json = serializer.data
            return Response(
                data={"status": "OK", "message": json}, status=status.HTTP_202_ACCEPTED
            )
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
