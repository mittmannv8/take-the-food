import Observer from "./observerInterface";

export class Network extends Observer {
  constructor({ protocol, host }) {
    super();
    this.listeners = {};
    this.socket = new WebSocket(`${protocol}://${host}`);

    this.socket.addEventListener("open", event =>
      this.dispatchEvent("open", event)
    );
    this.socket.addEventListener("close", event =>
      this.dispatchEvent("close", event)
    );
    this.socket.addEventListener("message", event => {
      this.dispatchEvent("message", event);

      const { action: _event, data } = JSON.parse(event.data);
      this.dispatchEvent(_event, data);
    });
  }

  send(event, message) {
    const formattedMessage = JSON.stringify({
      event,
      data: message
    });

    this.socket.send(formattedMessage);
  }
}
