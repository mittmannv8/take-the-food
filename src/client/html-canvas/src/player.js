const SIZE = 20;

export class Player {
  constructor(x = 0, y = 0, color = "#41EAD4") {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  setArena(arena) {
    this.arena = arena;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, SIZE, SIZE);
    ctx.fill();
  }

  move(direction) {
    switch (direction) {
      case "up":
        this.y = Math.max(0, this.y - SIZE);
        break;
      case "down":
        this.y = Math.min(this.arena?.height - SIZE, this.y + SIZE);
        break;
      case "left":
        this.x = Math.max(0, this.x - SIZE);
        break;
      case "right":
        this.x = Math.min(this.arena?.width - SIZE, this.x + SIZE);
        break;
    }
  }
}
