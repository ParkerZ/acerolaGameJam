import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Kitchen } from "./scenes/kitchen";

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#888888"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
  suppressPlayButton: true,
});

ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("counter");
ex.CollisionGroupManager.create("projectile");
ex.CollisionGroupManager.create("food");

const kitchen = new Kitchen();
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
