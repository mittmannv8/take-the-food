import { Joystick } from "./joystick";
import { Network } from "./network";
import { Player } from "./player";

import { colors, arena, network as networkConfig } from "./config.json";

export class Game {
  constructor() {
    this.player = new Player();
    this.players = [];

    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // set arena size
    this.canvas.width = arena.width;
    this.canvas.height = arena.height;

    document.body.appendChild(this.canvas);

    this.network = new Network(networkConfig);
    this.network.on("open", () => {
      this.network.send("join", { data: { nickname: "Cleiton" } });
    });
    this.network.on("joined", data => {
      const { player } = data;
      this.configurePlayer(player);
    });
    this.network.on("update", data => this.updatePlayers(data));

    requestAnimationFrame(() => this.draw());
  }

  configurePlayer(player) {
    this.player = new Player({ ...player, color: colors.player });
    this.player.plugJoystick(new Joystick());
    this.player.on("move", position =>
      this.network.send("changed-position", position)
    );
  }

  updatePlayers(players) {
    this.players = players
      .filter(player => !Boolean(player.id) || player.id !== this.player.id)
      .map(player => new Player({ ...player, color: colors.enemy }));

    this.players.push(this.player);
  }

  draw() {
    this.ctx.clearRect(0, 0, arena.width, arena.height);
    this.ctx.beginPath();

    // TODO: remove this text
    this.ctx.font = "20px Georgia";
    this.ctx.fillText(this.player.id, 0, 20);

    this.players.forEach(player => {
      player.draw(this.ctx);
    });

    requestAnimationFrame(() => this.draw());
  }
}
