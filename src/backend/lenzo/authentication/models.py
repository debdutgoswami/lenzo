from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class CustomUserModel(AbstractUser):
    """
    Custom User Model
    """

    dob = models.DateField(name="dob", null=True)
    phone = models.CharField(name="phone", null=True, unique=True, max_length=15)
