const EventEmitter = require("events");


class Entity extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }

  sendMessage(target, message) {
    console.log(`${this.name} sends message to ${target.name}: ${message}`);
    target.emit("message", this, message);
  }

  receiveMessage(source, message) {
    console.log(`${this.name} received message from ${source.name}: ${message}`);
  }

  listen() {
    this.on("message", (source, message) => this.receiveMessage(source, message));
  }
}


const entityA = new Entity("Alex");
const entityB = new Entity("Lise");
const entityC = new Entity("Keddy");


entityA.listen();
entityB.listen();
entityC.listen();

// Send messages
entityA.sendMessage(entityB, "Hello, Lise!");
entityB.sendMessage(entityC, "Hi, Keddy!");
entityC.sendMessage(entityA, "Hey, Alex!");
