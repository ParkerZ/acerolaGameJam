import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Kitchen1 } from "./scenes/kitchenLevels/kitchen1";
import { Player } from "./player";

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#0a0a0a"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
  suppressPlayButton: true,
});

ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("counter");
ex.CollisionGroupManager.create("projectile");
ex.CollisionGroupManager.create("food");

const player = new Player({ x: 0, y: 0 });

const kitchen = new Kitchen1({ player });
engine.add("kitchen", kitchen);

// Game events to handle
engine.on("hidden", () => {
  engine.stop();
});
engine.on("visible", () => {
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  engine.start("kitchen");
});

// For test hook
(window as any).engine = engine;
