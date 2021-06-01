import string
import random
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Room


def random_choice():
    """
    Creates a random id for room

    Regex: [a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}
    """
    alphabet = string.ascii_lowercase + string.digits
    return "".join(random.choices(alphabet, k=4))


@receiver(pre_save, sender=Room)
def create_id_for_room(update_fields, **kwargs):
    """
    Adds the ID to the model
    """
    if update_fields is not None:
        # doing this to avoid multiple creation of rooms when updating details
        return
    room_obj: Room = kwargs.get("instance")
    room_id = random_choice() + "-" + random_choice() + "-" + random_choice()
    room_obj.id = room_id
