import * as ex from "excalibur";
import { loader } from "./resources";
import { Kitchen1 } from "./scenes/kitchenLevels/kitchen1";
import { Player } from "./player";
import { Shop } from "./scenes/shopLevels/shop";
import { ShopHandgun } from "./scenes/shopLevels/shopItems/shopHandgun";
import { VampireLevel1 } from "./scenes/vampireLevels/vampireLevel1";

const buildSceneWithTransitions = (scene: ex.Scene) => ({
  scene,
  transitions: {
    in: new ex.FadeInOut({
      duration: 500,
      direction: "in",
      color: ex.Color.Black,
    }),
    out: new ex.FadeInOut({
      duration: 500,
      direction: "out",
      color: ex.Color.Black,
    }),
  },
});

const engine = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#0a0a0a"),
  width: 800,
  height: 600,
  fixedUpdateFps: 60,
  suppressPlayButton: true,
});

// TODO: collision groups don't work?
ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("counter");
ex.CollisionGroupManager.create("food");
ex.CollisionGroupManager.create("walls");
ex.CollisionGroupManager.create(
  "projectile",
  ~(
    ex.CollisionGroupManager.groupByName("food").category |
    ex.CollisionGroupManager.groupByName("walls").category
  )
);

const player = new Player({ x: 0, y: 0 });

const kitchen1 = new Kitchen1({ player });
const shop = new Shop({ player, seedWeapons: [ShopHandgun] });
const vampireLevel1 = new VampireLevel1({ player });

engine.add("kitchen1", buildSceneWithTransitions(kitchen1));
engine.add("shop", buildSceneWithTransitions(shop));
engine.add("vampire1", buildSceneWithTransitions(vampireLevel1));

kitchen1.events.on("orderscleared", () => {
  engine.start("shop");
});

shop.events.on("loadnextlevel", () => {
  engine.start("vampire1");
});

// Game events to handle
engine.on("hidden", () => {
  engine.stop();
});
engine.on("visible", () => {
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  engine.start("kitchen1");
});

// For test hook
(window as any).engine = engine;
