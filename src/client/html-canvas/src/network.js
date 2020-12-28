export class Network {
  constructor() {
    // this.conn = new WebSocket("")
    this.listeners = {};
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  dispatch(event, data) {
    this.listeners[event].forEach((callback) => callback(data));
  }
}
