from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.fields import empty

from ..models import Room
from ..validators import FileValidator


class RoomUserSerializer(serializers.ModelSerializer):
    """
    User Serializer for sending Room data
    """

    class Meta:
        model = get_user_model()
        fields = ("username", "email")


class RoomSerializer(serializers.ModelSerializer):
    """
    Converts JSON to ORM
    """

    id = serializers.CharField(max_length=14, read_only=True)
    host = RoomUserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    def __init__(self, instance=None, data=empty, **kwargs):
        try:
            self.host = kwargs.pop("host")
        except KeyError:
            pass
        super().__init__(instance, data, **kwargs)

    class Meta:
        model = Room
        fields = ("id", "name", "created_at", "is_live", "duration", "host")

    def create(self, validated_data):
        validated_data["host"] = self.host
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance: Room, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.is_live = bool(validated_data.get("is_live", instance.is_live))
        instance.save(update_fields=["name", "is_live"])
        return instance


class ImageSerializer(serializers.Serializer):
    validate_image = FileValidator(max_size=1024 * 100)
    image = serializers.FileField(validators=[validate_image])
