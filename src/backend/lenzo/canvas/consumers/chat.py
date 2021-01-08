from typing import Union

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from ..models import Room


class ChatConsumer(AsyncWebsocketConsumer):
    """
    Canvas Consumer
    """

    async def websocket_connect(self, event):
        """
        Websocket Connect
        """
        me = self.scope["user"]
        room_id = self.scope["url_route"]["kwargs"]["room_id"]
        room_obj = await self.get_room(room_id)
        if room_obj is None:
            await self.disconnect(code=400)
        await self.accept()

    async def websocket_receive(self, event):
        """
        Websocket Receive
        """
        user = self.scope["user"]
        await self.send("received")

    async def websocket_disconnect(self, event):
        """
        Websocket Disconnect
        """
        print(self.scope)
        await self.disconnect()

    @database_sync_to_async
    def get_room(self, id: str) -> Union[Room, None]:
        """
        Returns Room Object
        """
        try:
            return Room.objects.get(pk=id)
        except Room.DoesNotExist:
            return None
