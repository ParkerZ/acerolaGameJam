import * as ex from "excalibur";
import { loader } from "./resources";
import { Kitchen1 } from "./scenes/kitchenLevels/kitchen1";
import { Player } from "./player";
import { Shop } from "./scenes/shopLevels/shop";
import { ShopHandgun } from "./scenes/shopLevels/shopItems/shopHandgun";
import { VampireLevel1 } from "./scenes/vampireLevels/vampireLevel1";
import { Kitchen2 } from "./scenes/kitchenLevels/kitchen2";
import { Kitchen3 } from "./scenes/kitchenLevels/kitchen3";
import { Kitchen4 } from "./scenes/kitchenLevels/kitchen4";
import { Kitchen5 } from "./scenes/kitchenLevels/kitchen5";
import { VampireLevel3 } from "./scenes/vampireLevels/vampireLevel3";
import { VampireLevel2 } from "./scenes/vampireLevels/vampireLevel2";
import { ShopHeavyMachineGun } from "./scenes/shopLevels/shopItems/shopHeavyMachineGun";
import { ShopShotgun } from "./scenes/shopLevels/shopItems/shopShotgun";
import { ShopSubMachineGun } from "./scenes/shopLevels/shopItems/shopSubMachineGun";
import { ShopSniper } from "./scenes/shopLevels/shopItems/shopSniper";

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
const shop1 = new Shop({
  player,
  seedWeapons: [ShopHandgun, ShopHeavyMachineGun],
});
const kitchen2 = new Kitchen2({ player });
const vampireLevel1 = new VampireLevel1({ player });
const shop2 = new Shop({ player, seedWeapons: [ShopHandgun, ShopShotgun] });
const kitchen3 = new Kitchen3({ player });
const vampireLevel2 = new VampireLevel2({ player });
const shop3 = new Shop({
  player,
  seedWeapons: [ShopSubMachineGun, ShopSniper],
});
const kitchen4 = new Kitchen4({ player });
const vampireLevel3 = new VampireLevel3({ player });
const shop4 = new Shop({
  player,
  seedWeapons: [ShopHeavyMachineGun, ShopSubMachineGun, ShopSniper],
});
const kitchen5 = new Kitchen5({ player });

engine.add("kitchen1", buildSceneWithTransitions(kitchen1));
engine.add("shop1", buildSceneWithTransitions(shop1));
engine.add("kitchen2", buildSceneWithTransitions(kitchen2));
engine.add("vampire1", buildSceneWithTransitions(vampireLevel1));
engine.add("shop2", buildSceneWithTransitions(shop2));
engine.add("kitchen3", buildSceneWithTransitions(kitchen3));
engine.add("vampire2", buildSceneWithTransitions(vampireLevel2));
engine.add("shop3", buildSceneWithTransitions(shop3));
engine.add("kitchen4", buildSceneWithTransitions(kitchen4));
engine.add("vampire3", buildSceneWithTransitions(vampireLevel3));
engine.add("shop4", buildSceneWithTransitions(shop4));
engine.add("kitchen5", buildSceneWithTransitions(kitchen5));

kitchen1.events.on("orderscleared", () => {
  engine.goto("shop1");
  engine.clock.schedule(() => {
    engine.removeScene(kitchen1);
    kitchen1.clear();

    player.showCoinHud(engine);
  }, 1500);
});

shop1.events.on("loadnextlevel", () => {
  engine.goto("kitchen2");
  engine.clock.schedule(() => {
    engine.removeScene(shop1);
    shop1.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

kitchen2.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire1");
  engine.clock.schedule(() => {
    engine.remove(kitchen2);
    kitchen2.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

vampireLevel1.events.on("loadnextlevel", () => {
  engine.goto("shop2");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel1);
    vampireLevel1.clear();

    player.showCoinHud(engine);
  }, 1500);
});

shop2.events.on("loadnextlevel", () => {
  engine.goto("kitchen3");
  engine.clock.schedule(() => {
    engine.remove(shop2);
    shop2.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

kitchen3.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire2");
  engine.clock.schedule(() => {
    engine.remove(kitchen3);
    kitchen3.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

vampireLevel2.events.on("loadnextlevel", () => {
  engine.goto("shop3");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel2);
    vampireLevel2.clear();

    player.showCoinHud(engine);
  }, 1500);
});

shop3.events.on("loadnextlevel", () => {
  engine.goto("kitchen4");
  engine.clock.schedule(() => {
    engine.remove(shop3);
    shop3.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

kitchen4.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire3");
  engine.clock.schedule(() => {
    engine.remove(kitchen4);
    kitchen4.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

vampireLevel3.events.on("loadnextlevel", () => {
  engine.goto("shop4");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel3);
    vampireLevel3.clear();

    player.showCoinHud(engine);
  }, 1500);
});

shop4.events.on("loadnextlevel", () => {
  engine.goto("kitchen5");
  engine.clock.schedule(() => {
    engine.remove(shop4);
    shop4.clear();

    engine.add(player);
    player.setIsEnabled(engine, true);
  }, 1500);
});

kitchen5.events.on("loadnextcombatlevel", () => {
  // engine.goto("");
  alert("YOU WON");
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
