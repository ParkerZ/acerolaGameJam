import * as ex from "excalibur";
import {
  invertSpriteSheet,
  vampireBgSprite,
  vampireWallsSprite,
} from "../../resources";
import { Player } from "../../player";
import { NextLevelEvent } from "../../types";
import { PlayerCameraMount } from "../../playerCameraMount";
import { COUNTER_WIDTH } from "../../constants";
import { Wall } from "../../wall";
import { StatusBar } from "../../statusBar";
import { EnemySpawner } from "../../enemies/enemySpawner";

export class VampireLevelBase extends ex.Scene {
  public events = new ex.EventEmitter<
    ex.SceneEvents & { loadnextlevel: NextLevelEvent }
  >();

  protected player: Player;
  protected spawner: EnemySpawner;
  protected timerMs: number;
  protected timerTickMs: number = 100;
  protected timerBar: StatusBar;

  private walls: Wall[] = [];
  private floors: ex.Actor[] = [];

  constructor({
    player,
    spawner,
    timerMs,
  }: {
    player: Player;
    spawner: EnemySpawner;
    timerMs: number;
  }) {
    super();
    this.player = player;
    this.timerMs = timerMs;
    this.spawner = spawner;
    this.timerBar = new StatusBar({
      x: 0,
      y: 0,
      z: 2,
      maxVal: timerMs,
      size: "thin",
      color: ex.Color.ExcaliburBlue,
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.timerBar.setPos(
      ex.vec(engine.halfDrawWidth, (engine.halfDrawHeight * 6) / 100)
    );
    engine.add(this.timerBar);

    engine.clock.schedule(() => {
      this.initializeTimerCountdown(engine);
    }, 500);

    const cameraMount = new PlayerCameraMount(this.player);

    this.player.setIsEnabled(engine, true);

    this.addWalls(engine);

    this.player.setPos(ex.vec(engine.halfDrawWidth, engine.halfDrawHeight));
    engine.add(this.player);
    engine.add(cameraMount);

    this.camera.pos = cameraMount.pos;
    this.camera.clearAllStrategies();
    this.camera.strategy.elasticToActor(cameraMount, 0.05, 0.1);

    engine.add(this.spawner);
  }

  private initializeTimerCountdown(engine: ex.Engine<any>) {
    if (!this.isCurrentScene()) {
      return;
    }

    if (this.timerMs <= 0) {
      this.cleanupSpawner(engine);
      this.events.emit("loadnextlevel");
      return;
    }

    this.timerMs -= this.timerTickMs;
    this.timerBar.setCurrVal(Math.max(this.timerMs, 0));

    engine.clock.schedule(() => {
      this.initializeTimerCountdown(engine);
    }, this.timerTickMs);
  }

  protected cleanupSpawner(engine: ex.Engine<any>): void {
    this.spawner.kill();
    engine.remove(this.spawner);
  }

  private addWalls(engine: ex.Engine<any>) {
    const graphicOffset = ex.vec(64 * 6 - 16, 64 * 4 + 13);
    const bg = new ex.Actor({
      x: 0,
      y: 0,
      z: -1,
      anchor: ex.Vector.Half,
    });
    bg.graphics.use(vampireBgSprite, { offset: graphicOffset });
    engine.add(bg);

    const wallCollider = new ex.CompositeCollider([
      ex.Shape.Box(
        2368,
        64,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth, engine.halfDrawHeight - 64 * 18.5)
      ),
      ex.Shape.Box(
        2368,
        64,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth, engine.halfDrawHeight + 64 * 17.5)
      ),
      ex.Shape.Box(
        64,
        2368,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth + 64 * 17.5, engine.halfDrawHeight)
      ),
      ex.Shape.Box(
        64,
        2368,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth - 64 * 18.5, engine.halfDrawHeight)
      ),
    ]);

    const walls = new Wall({
      collider: wallCollider,
      anchor: ex.Vector.Half,
    });

    walls.graphics.use(vampireWallsSprite, {
      offset: graphicOffset,
    });
    engine.add(walls);

    this.events.on("deactivate", () => {
      this.player = new Player({ x: 0, y: 0 });
      bg.kill();
      walls.kill();
      engine.remove(bg);
      engine.remove(walls);
    });
  }

  onDeactivate(context: ex.SceneActivationContext<undefined>): void {
    this.walls.forEach((wall) => {
      wall.kill();
      context.engine.remove(wall);
    });

    this.floors.forEach((floor) => {
      floor.kill();
      context.engine.remove(floor);
    });
  }
}
