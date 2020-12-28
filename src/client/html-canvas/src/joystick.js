export class Joystick {
  constructor() {
    this.target = null;

    this.actions = {};

    this.listeners = {
      up: [],
      down: [],
      left: [],
      right: [],
    };

    window.addEventListener(
      "keydown",
      this.keyDispatcher.bind(this, "keydown")
    );
    window.addEventListener("keyup", this.keyDispatcher.bind(this, "keyup"));
  }

  keyDispatcher(eventType, event) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.dispatch("up");
        break;
      case "ArrowDown":
      case "KeyS":
        this.dispatch("down");
        break;

      case "ArrowLeft":
      case "KeyA":
        this.dispatch("left");
        break;

      case "ArrowRight":
      case "KeyD":
        this.dispatch("right");
        break;
    }
  }

  addEventListener(event, callback) {
    this.listeners[event].push(callback);
  }

  dispatch(event) {
    this.listeners[event]?.forEach((callback) => callback());
  }
}
