import { arena } from "./config.json";
import Observer from "./observerInterface";

export class Player extends Observer {
  constructor({ id = null, position = { x: 0, y: 0 }, color = null } = {}) {
    super();
    this.listeners = {};
    this.id = id;
    this.color = color;

    this.position = position;
  }

  plugJoystick(joystick) {
    joystick.on("up", () => this.move("up"));
    joystick.on("down", () => this.move("down"));
    joystick.on("left", () => this.move("left"));
    joystick.on("right", () => this.move("right"));
  }

  draw(ctx) {
    const { x, y } = this.position;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(x, y, arena.spot, arena.spot);
    ctx.fill();
  }

  move(direction) {
    let changed = false;
    switch (direction) {
      case "up":
        this.position.y = Math.max(0, this.position.y - arena.spot);
        changed = true;
        break;
      case "down":
        this.position.y = Math.min(arena.height - arena.spot, this.position.y + arena.spot);
        changed = true;
        break;
      case "left":
        this.position.x = Math.max(0, this.position.x - arena.spot);
        changed = true;
        break;
      case "right":
        this.position.x = Math.min(arena.width - arena.spot, this.position.x + arena.spot);
        changed = true;
        break;
    }

    if (changed) {
      this.dispatchEvent("move", { ...this.position });
    }
  }
}
