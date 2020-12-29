import Observer from "./observerInterface";

export class Joystick extends Observer {
  constructor() {
    super();

    window.addEventListener(
      "keydown",
      this.keyDispatcher.bind(this, "keydown")
    );
  }

  keyDispatcher(eventType, event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.dispatchEvent("up");
        break;
      case "ArrowDown":
      case "KeyS":
        this.dispatchEvent("down");
        break;

      case "ArrowLeft":
      case "KeyA":
        this.dispatchEvent("left");
        break;

      case "ArrowRight":
      case "KeyD":
        this.dispatchEvent("right");
        break;
    }
  }
}
