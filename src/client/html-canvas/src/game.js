import { Joystick } from "./joystick";
import { Network } from "./network";
import { Player } from "./player";

const Arena = {
  width: 800,
  height: 600,
};

export class Game {
  constructor() {
    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // set arena size
    this.width = Arena.width;
    this.height = Arena.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.body.appendChild(this.canvas);

    this.player = new Player();
    this.player.setArena(Arena);

    this.joystick = new Joystick();
    this.joystick.addEventListener("up", () => this.player.move("up"));
    this.joystick.addEventListener("down", () => this.player.move("down"));
    this.joystick.addEventListener("left", () => this.player.move("left"));
    this.joystick.addEventListener("right", () => this.player.move("right"));

    this.network = new Network();

    requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.player.draw(this.ctx);

    requestAnimationFrame(() => this.draw());
  }
}
