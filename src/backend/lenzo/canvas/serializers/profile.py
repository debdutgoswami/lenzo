from django.contrib.auth import get_user_model
from rest_framework import serializers

from ..models import Room


class RoomSerializerProfile(serializers.ModelSerializer):
    """
    Room Serializer
    """

    class Meta:
        model = Room
        fields = (
            "id",
            "name",
            "created_at",
            "is_live",
        )


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for Profile Section
    """

    hosted = RoomSerializerProfile(read_only=True, many=True)
    participated = RoomSerializerProfile(read_only=True, many=True)
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "first_name",
            "last_name",
            "username",
            "email",
            "dob",
            "date_joined",
            "hosted",
            "participated",
        )

    def update(self, instance, validated_data):
        pass
