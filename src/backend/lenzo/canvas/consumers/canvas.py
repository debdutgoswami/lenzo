import json
from typing import Optional

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.consumer import AsyncConsumer
from channels.exceptions import StopConsumer
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone

from ..models import Room


class CanvasConsumer(AsyncConsumer):
    """
    Canvas Consumer

    @status_codes:
        200 - OK
        400 - INVALID ROOM ID
        401 - AUTHENTICATION ERROR
        403 - HOST NOT FOUND (shouldn't encounter)
    """

    async def websocket_connect(self, event):
        """
        Websocket Connect
        """
        # needs to accept the socket connection to allow sending data
        await self.accept()

        user = self.scope["user"]
        if user == AnonymousUser():
            # if invalid token is sent then we return and ERROR saying Invalid User
            await self.unauthenticated()
        else:
            room_id = self.scope["url_route"]["kwargs"]["room_id"]

            room = await self.get_room(room_id)
            if room is None:
                await self.send_json(
                    status="ERROR",
                    content="Invalid Room ID",
                    code=400,
                    close=True,
                )
            else:
                self.scope["room"] = room

                room_host = await self.get_room_host(room)
                if room_host is None:
                    await self.send_json(
                        status="ERROR",
                        content="Host Not Found",
                        code=403,
                    )
                else:
                    self.scope["host"] = room_host

                    if room_host == user:
                        # changes live status and duration if host enters
                        await self.update_room_stats(room)
                        self.scope["room"] = room
                        await self.send_json(
                            content={
                                "host": True,
                            },
                        )
                    else:
                        await self.send_json(
                            content={
                                "host": False,
                            },
                        )

                    canvas_room_name = f"canvas_{room_id}"
                    self.canvas_room_name = canvas_room_name
                    await self.channel_layer.group_add(
                        canvas_room_name,
                        self.channel_name,
                    )

    async def websocket_receive(self, event):
        """
        Websocket Receive
        """
        user = self.scope["user"]

        if user == AnonymousUser():
            await self.unauthenticated()
        else:
            print(event)
            print(self.scope["room"].is_live)
            new_event = {
                "type": "canvas_draw_event",
                "text": await self.encode_json(
                    {
                        "status": "OK",
                        "message": {
                            # "x": 20.4,
                            # "y": 30.4,
                            # "radius": 20,
                            "event": event["text"],
                        },
                        "code": 200,
                    }
                ),
            }
            # broadcasts the message event to be sent
            await self.channel_layer.group_send(
                self.canvas_room_name,
                new_event,
            )

    async def canvas_draw_event(self, event):
        """
        Handler for Canvas Drawings
        """
        print("message", event)
        # sends the actual message
        await self.send_json(
            content=event["text"],
        )

    async def websocket_disconnect(self, event):
        """
        Websocket Disconnect
        """
        raise StopConsumer()

    async def update_room_stats(self, room: Room) -> None:
        """
        Updates Room Stats when host enters
        """
        # changes live status and duration if host enters
        room.is_live = True
        if room.start_time is not None and room.end_time is not None:
            duration = room.end_time - room.start_time
            room.duration = duration.total_seconds()
        room.start_time = timezone.now()

        await self.__save_room_stats(room)

    @database_sync_to_async
    def get_room(self, room_id: str) -> Optional[Room]:
        """
        Returns Room Object
        """
        try:
            return Room.objects.get(pk=room_id)
        except Room.DoesNotExist:
            return None

    @database_sync_to_async
    def get_room_host(self, room: Room):
        """
        Returns Room Host Object
        """
        try:
            return room.host
        except AttributeError:
            return None

    @database_sync_to_async
    def __save_room_stats(self, room: Room):
        """
        Saves Room Object after updating
        """
        room.save(
            update_fields=[
                "is_live",
                "start_time",
                "end_time",
                "duration",
            ]
        )

    async def send_json(self, content, code=200, status="OK", close=False):
        """
        Encode the given content as JSON and send it to the client.
        """
        await self.send(
            text_data=await self.encode_json(
                {"status": status, "message": content, "code": code}
            ),
            close=close,
        )

    async def unauthenticated(self):
        """
        Handles Unauthenticated Connections
        """
        await self.send_json(
            content="Invalid User",
            code=401,
            close=True,
        )

    async def accept(self):
        """
        Accepts an incoming socket
        """
        await super().send({"type": "websocket.accept"})

    async def send(self, text_data=None, bytes_data=None, close=False):
        """
        Sends a reply back down the WebSocket
        """
        if text_data is not None:
            await super().send({"type": "websocket.send", "text": text_data})
        elif bytes_data is not None:
            await super().send({"type": "websocket.send", "bytes": bytes_data})
        else:
            raise ValueError("You must pass one of bytes_data or text_data")
        if close:
            await self.close(close)

    async def close(self, code=None):
        """
        Closes the WebSocket from the server end
        """
        if code is not None and code is not True:
            await super().send({"type": "websocket.close", "code": code})
        else:
            await super().send({"type": "websocket.close"})

    @classmethod
    async def decode_json(cls, text_data):
        """
        Serializers string to JSON
        """
        return json.loads(text_data)

    @classmethod
    async def encode_json(cls, content):
        """
        Serializers JSON to string
        """
        return json.dumps(content)