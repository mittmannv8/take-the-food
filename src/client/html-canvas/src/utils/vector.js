import { randomInt } from "./random";

export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  random() {
    return new Vector(1, 1);
  }
}
