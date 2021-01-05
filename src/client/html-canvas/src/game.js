import { Joystick } from "./joystick";
import { Network } from "./network";
import { Fruit, Player } from "./player";

import { DEBUG, colors, arena, network as networkConfig } from "./config.json";
import { Sound } from "./audio";

export class Game {
  constructor(username) {
    this.player = new Player();
    this.players = [];
    this.fruit = undefined;

    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    const sound = new Sound(
      "https://freesound.org/data/previews/368/368691_4930962-lq.mp3"
    );

    // set arena size
    this.canvas.width = arena.width;
    this.canvas.height = arena.height;

    document.body.appendChild(this.canvas);

    this.network = new Network(networkConfig);
    this.network.on("open", () => {
      this.network.send("join", { nickname: username });
    });
    this.network.on("joined", data => {
      sound.play();

      const { player } = data;
      this.configurePlayer(player);
    });

    this.network.on("update-players", player => this.updatePlayers(player));
    this.network.on("update-fruit", fruit => this.updateFruit(fruit));

    this.collisionSound = new Sound(
      "https://freesound.org/data/previews/391/391659_7368738-lq.mp3"
    );

    requestAnimationFrame(() => this.draw());
  }

  configurePlayer(player) {
    this.player = new Player({ ...player, color: colors.player });
    this.player.plugJoystick(new Joystick());
    this.player.on("move", position => {
      this.checkCollision();
      this.network.send("changed-position", position);
    });
  }

  /**
   * This method does not apply the score because that rule is computed in
   * server-side. Its responsibility regards to apply sounds and effects since
   * the server response might has lag so the player experience might be strange.
   */
  checkCollision() {
    if (
      this.player.position.x === this.fruit.position.x &&
      this.player.position.y === this.fruit.position.y
    ) {
      this.collisionSound.play();
    }
  }

  updateFruit(fruit) {
    this.fruit = new Fruit(fruit);
  }

  updatePlayers(players) {
    this.players = players
      .filter(player => !Boolean(player.id) || player.id !== this.player.id)
      .map(player => new Player({ ...player, color: colors.enemy }));

    this.players.push(this.player);
  }

  draw() {
    console.log("draw player");
    this.ctx.clearRect(0, 0, arena.width, arena.height);
    this.ctx.beginPath();

    this.fruit && this.fruit.draw(this.ctx);

    // TODO: remove this text
    if (DEBUG) {
      this.ctx.font = "20px Georgia";
      this.ctx.fillText(this.player.nickname, 0, 20);
    }

    this.players.forEach(player => {
      player.draw(this.ctx);
    });

    requestAnimationFrame(() => this.draw());
  }
}
