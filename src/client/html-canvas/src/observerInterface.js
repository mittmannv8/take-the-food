export default class Observer {
  constructor() {
    this.listeners = {};
  }

  dispatchEvent(event, data) {
    this.listeners[event]?.forEach(callback => callback(data));
  }

  on(event, callback) {
    this.listeners[event] = [...(this.listeners[event] ?? []), callback];
  }
}
