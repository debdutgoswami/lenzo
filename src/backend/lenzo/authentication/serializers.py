from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # add custom claims below
        # token['DOB'] = user.dob

        return token


class AuthUserSerializer(serializers.ModelSerializer):
    """
    Converts JSON to ORM
    """

    def validate_username(self, value):
        ModelClass = self.Meta.model
        if ModelClass.objects.filter(username=value).exists():
            raise serializers.ValidationError(f"user exists with {value} username")
        return value

    def validate_email(self, value):
        """Checks is user already exists with the same email"""
        ModelClass = self.Meta.model
        if ModelClass.objects.filter(email=value).exists():
            raise serializers.ValidationError(f"user exists with {value}")
        return value

    class Meta:
        model = get_user_model()
        fields = (
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True, "allow_blank": False},
        }
        read_only_fields = (
            "is_staff",
            "date_joined",
            "is_active",
        )

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(
            **validated_data
        )  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
