import * as ex from "excalibur";
import { loader } from "./resources";
import { Kitchen1 } from "./scenes/kitchenLevels/kitchen1";
import { Player } from "./player";
import { VampireLevel1 } from "./scenes/vampireLevels/vampireLevel1";
import { Kitchen2 } from "./scenes/kitchenLevels/kitchen2";
import { Kitchen3 } from "./scenes/kitchenLevels/kitchen3";
import { Kitchen4 } from "./scenes/kitchenLevels/kitchen4";
import { Kitchen5 } from "./scenes/kitchenLevels/kitchen5";
import { VampireLevel3 } from "./scenes/vampireLevels/vampireLevel3";
import { VampireLevel2 } from "./scenes/vampireLevels/vampireLevel2";
import { COLORS, SCENE_FADE_OUT_TIME } from "./constants";

const buildSceneWithTransitions = (scene: ex.Scene) => ({
  scene,
  transitions: {
    in: new ex.FadeInOut({
      duration: SCENE_FADE_OUT_TIME,
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
  backgroundColor: COLORS.purple,
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
const kitchen2 = new Kitchen2({ player });
const vampireLevel1 = new VampireLevel1({ player });
const kitchen3 = new Kitchen3({ player });
const vampireLevel2 = new VampireLevel2({ player });
const kitchen4 = new Kitchen4({ player });
const vampireLevel3 = new VampireLevel3({ player });
const kitchen5 = new Kitchen5({ player });

engine.add("kitchen1", buildSceneWithTransitions(kitchen1));
engine.add("kitchen2", buildSceneWithTransitions(kitchen2));
engine.add("vampire1", buildSceneWithTransitions(vampireLevel1));
engine.add("kitchen3", buildSceneWithTransitions(kitchen3));
engine.add("vampire2", buildSceneWithTransitions(vampireLevel2));
engine.add("kitchen4", buildSceneWithTransitions(kitchen4));
engine.add("vampire3", buildSceneWithTransitions(vampireLevel3));
engine.add("kitchen5", buildSceneWithTransitions(kitchen5));

kitchen1.events.on("orderscleared", () => {
  engine.goto("kitchen2");
  engine.clock.schedule(() => {
    engine.removeScene(kitchen1);
    kitchen1.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "purple");
  }, SCENE_FADE_OUT_TIME + 100);
});

kitchen2.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire1");
  engine.clock.schedule(() => {
    engine.remove(kitchen2);
    kitchen2.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "green");
  }, SCENE_FADE_OUT_TIME + 100);
});

vampireLevel1.events.on("loadnextlevel", () => {
  engine.goto("kitchen3");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel1);
    vampireLevel1.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "purple");
  }, SCENE_FADE_OUT_TIME + 100);
});

kitchen3.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire2");
  engine.clock.schedule(() => {
    engine.remove(kitchen3);
    kitchen3.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "green");
  }, SCENE_FADE_OUT_TIME + 100);
});

vampireLevel2.events.on("loadnextlevel", () => {
  engine.goto("kitchen4");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel2);
    vampireLevel2.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "purple");
  }, SCENE_FADE_OUT_TIME + 100);
});

kitchen4.events.on("loadnextcombatlevel", () => {
  engine.goto("vampire3");
  engine.clock.schedule(() => {
    engine.remove(kitchen4);
    kitchen4.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "green");
  }, SCENE_FADE_OUT_TIME + 100);
});

vampireLevel3.events.on("loadnextlevel", () => {
  engine.goto("kitchen5");
  engine.clock.schedule(() => {
    engine.remove(vampireLevel3);
    vampireLevel3.clear();

    engine.add(player);
    player.setIsEnabled(engine, true, "purple");
  }, SCENE_FADE_OUT_TIME + 100);
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
  engine.start("kitchen1").then(() => {
    player.setIsEnabled(engine, true);
  });
});

// For test hook
(window as any).engine = engine;
