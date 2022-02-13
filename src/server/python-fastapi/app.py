from email import message
import time
from pydantic.types import UUID4
import uvicorn
from datetime import datetime
from uuid import UUID, uuid4
from typing import Any, Dict
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

app = FastAPI()

@app.get('/')
def home():
    return "It works"

class Message(BaseModel):
    timestamp: datetime
    event: str
    data: Any


class Position(BaseModel):
    x: int
    y: int


class PlayerSchema(BaseModel):
    id: str
    nickname: str
    position: Position


def make_message(event: str, data: Any) -> Message:
    return Message(timestamp=datetime.now(), event=event, data=data)


class Player:
    def __init__(self, websocket: WebSocket):
        self.id = uuid4()
        self.ws = websocket
        self.position = Position(x=0, y=0)
        self.nickname = ""
    
    async def listener(self):
        while True:
            message: Message = await self.ws.receive_json()

    def serialize(self):
        return PlayerSchema(
            id=str(self.id),
            nickname=self.nickname,
            position=self.position
        ).dict()

class RoomManager:
    def __init__(self):
        self.players: Dict[UUID, WebSocket] = {}
    
    async def send_update_players(self):
        print("update players")
        await self.send_room_message(make_message('update-players', [player.serialize() for player in self.players.values()]))
    
    async def connect(self, player: Player):
        await player.ws.accept()
        self.players[player.id] = player

        await self.send_messsage(
            player.id,
            make_message('joined', player.serialize())
        )
    
    async def send_room_message(self, message: Message):
        for player in self.players:
            await self.send_messsage(player, message)

    async def send_messsage(self, player_id: UUID, message: Message):
        await self.players[player_id].ws.send_json(jsonable_encoder(message))

    async def on_message(self, player: Player, data: dict):
        if data["event"] == 'join':
            player.nickname = data["data"]["nickname"]
        if data["event"] == 'changed-position':
            player.position = data["data"]


room_manager = RoomManager()

@app.websocket('/')
async def room(websocket: WebSocket):
    player = Player(websocket)
    await room_manager.connect(player)

    active = True

    while active:
        try:
            data = await websocket.receive_json()
            await room_manager.on_message(player, data)
            await room_manager.send_update_players()
            print(f"received {data}")
            
            if time.perf_counter() % 1000 == 0:
                print('second')
        except (Exception, WebSocketDisconnect):
            print(f"Player {player.id} disconected")
            del room_manager.players[player.id]
            await room_manager.send_update_players()
            active = False






if __name__ == '__main__':
    uvicorn.run("app", host="127.0.0.1", port=9000, reload=True)