# TAKE THE FOOD

The **Take the food** game is a project based on client-server arquitecture to explore and test programming languages, programming paradigms and architectures using a fun way: a game!

The main goal of this project is enable me to create a new client/server and just plug it to any pre-existing server/client.
In another words, if I want to test any client-side arquitecture/framework/language, like HTML Canvas for instance, I will create it and run any server-side project to test it and vice-versa.


## Terminology
**Arena**: 2-dimension retangular place where players are inserted and they are allowed to move but they can not overpass the arena's boundaries.
**Multiplayer**: means a single arena can holds more then one player simultanly
**Spot**: each single squarred place inside the arena where players and food can be.

## The game specifications
**Take the food** is a 2D arena multiplayer game where the players need to take the food that is ramdomly placed into arena. When a player hits (moves to the same position where the food is), the food should be removed from the arena, the player score should be increased by one and another food should be placed in another ramdomly place into arena.


The game follows these requirements:
- Multiplayer
- Cross platform
- Real-time (using websocket)
- Must have multiple private/public arenas
- Users must wait in a waiting room while the arena has the minimun number of players
- Must allow the player create/join private arenas
- The game logic must be in the server-side
- The client side must show the players score

## Server-side specifications
- TODO

## Client-side specifications
- TODO
