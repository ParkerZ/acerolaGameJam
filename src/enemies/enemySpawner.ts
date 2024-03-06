import * as ex from "excalibur";
import { Enemy1 } from "./enemy1";
import { Player } from "../player";
import {
  MAX_X_SPAWN,
  MAX_Y_SPAWN,
  MIN_X_SPAWN,
  MIN_Y_SPAWN,
} from "../constants";
import { StickyEnemy1 } from "./stickyEnemy1";
import { EnemyBase } from "./enemyBase";
import { CombinedEnemy1 } from "./combinedEnemy1";

export class EnemySpawner extends ex.Actor {
  private Enemy: typeof Enemy1;
  private target: Player;
  private spawnRateMs: number;
  private spawnCap: number;
  private isEnabled: boolean = true;
  private enemies: ex.Actor[] = [];
  private lastTargetPos: ex.Vector = ex.Vector.Zero;
  private speedModifier: number = 0;
  private stickyCount = 0;

  constructor({
    Enemy,
    target,
    spawnRateMs,
    spawnCap,
  }: {
    Enemy: typeof Enemy1;
    target: Player;
    spawnRateMs: number;
    spawnCap: number;
  }) {
    super();

    this.Enemy = Enemy;
    this.target = target;
    this.spawnRateMs = spawnRateMs;
    this.spawnCap = spawnCap;
  }

  public setIsEnabled(val: boolean) {
    this.isEnabled = val;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.initializeSpawnLoop(engine);
  }

  private initializeSpawnLoop(engine: ex.Engine<any>) {
    if (!this.isEnabled) {
      return;
    }

    this.spawnEnemy(engine);

    setTimeout(() => {
      this.initializeSpawnLoop(engine);
    }, this.spawnRateMs);
  }

  private spawnEnemy(engine: ex.Engine<any>) {
    if (this.enemies.length >= this.spawnCap) {
      return;
    }

    this.speedModifier++;
    this.spawnRateMs = Math.max(this.spawnRateMs - 10, 250);

    const randomDir = this.getSmartRandomPosition(engine);

    let newEnemy = new this.Enemy({
      x: randomDir.x,
      y: randomDir.y,
      target: this.target,
      speedModifier: this.speedModifier,
    });

    // Make sure to intermix sticky enemies
    if (
      this.enemies.length % 4 === 0 ||
      (this.enemies.length > this.spawnCap / 2 && this.stickyCount === 0)
    ) {
      this.stickyCount++;
      newEnemy = new StickyEnemy1({
        x: randomDir.x,
        y: randomDir.y,
        target: this.target,
        speedModifier: this.speedModifier,
      });
    }

    console.log(this.stickyCount);
    this.addEnemy(engine, newEnemy);

    newEnemy.events.on("combineenemies", ({ enemiesToCombine }) => {
      this.stickyCount--;

      const positionForCombinedEnemy = newEnemy.pos.clone();
      let combinedHealth = 0;
      let count = 0;

      enemiesToCombine.forEach((enemy) => {
        count++;
        combinedHealth += enemy.getHealth();
        engine.remove(enemy);
        enemy.kill();

        const enemyIndex = this.enemies.findIndex((e) => e.name == enemy.name);
        if (enemyIndex === -1) {
          return;
        }

        this.enemies.splice(enemyIndex, 1);
      });

      const stickyEnemyIndex = this.enemies.findIndex(
        (e) => e.name == newEnemy.name
      );

      if (stickyEnemyIndex === -1) {
        const combinedEnemy = new CombinedEnemy1({
          x: positionForCombinedEnemy.x,
          y: positionForCombinedEnemy.y,
          target: this.target,
          numCombined: count || 1,
          health: combinedHealth || 1,
          speedModifier: this.speedModifier,
        });

        this.addEnemy(engine, combinedEnemy);
        return;
      }

      combinedHealth += newEnemy.getHealth();
      count += 1;

      engine.remove(newEnemy);
      newEnemy.kill();
      this.enemies.splice(stickyEnemyIndex, 1);

      const combinedEnemy = new CombinedEnemy1({
        x: positionForCombinedEnemy.x,
        y: positionForCombinedEnemy.y,
        target: this.target,
        numCombined: count || 1,
        health: combinedHealth || 1,
        speedModifier: this.speedModifier,
      });

      this.addEnemy(engine, combinedEnemy);
    });
  }

  private addEnemy(
    engine: ex.Engine<any>,
    newEnemy: Enemy1 | StickyEnemy1 | CombinedEnemy1
  ) {
    this.enemies.push(newEnemy);
    engine.add(newEnemy);

    newEnemy.events.on("enemydied", () => {
      if (newEnemy instanceof StickyEnemy1) {
        this.stickyCount--;
      }

      const enemyToRemove = this.enemies.findIndex(
        (enemy) => enemy.name == newEnemy.name
      );

      if (enemyToRemove === -1) {
        console.log("Unknown enemy died");
        return;
      }

      console.log("known enemy died");

      this.enemies.splice(enemyToRemove, 1);
    });
  }

  /**
   * Attempts to create a random spawn position that is outside the current field of view.
   * The direction can be from any place around the player so long as it wouldn't spawn the enemy outside the map.
   *
   * If the player is along a wall, a direction that thwarts player movement is chosen.
   * If the player is in a corner, a direction directly lateral or vertical is chosen.
   */
  private getSmartRandomPosition(engine: ex.Engine<any>): ex.Vector {
    let xDir = Math.random() < 0.5 ? -1 : 1;
    const targetDeltaX = this.target.pos.x - this.lastTargetPos.x;
    if (targetDeltaX > 0) {
      xDir = 1;
    } else if (targetDeltaX < 0) {
      xDir = -1;
    }

    let yDir = Math.random() < 0.5 ? -1 : 1;
    const targetDeltaY = this.target.pos.y - this.lastTargetPos.y;
    if (targetDeltaY > 0) {
      yDir = 1;
    } else if (targetDeltaY < 0) {
      yDir = -1;
    }

    this.lastTargetPos = this.target.pos.clone();

    // [600]====player====[600]
    let xMagnitude =
      xDir * (Math.floor(Math.random() * 800) + engine.halfDrawWidth + 100);

    let yMagnitude =
      yDir * (Math.floor(Math.random() * 600) + engine.halfDrawHeight + 100);

    if (
      (this.target.pos.x + xMagnitude > MAX_X_SPAWN ||
        this.target.pos.x + xMagnitude < MIN_X_SPAWN) &&
      (this.target.pos.y + yMagnitude > MAX_Y_SPAWN ||
        this.target.pos.y + yMagnitude < MIN_Y_SPAWN)
    ) {
      const randomBool = !Math.floor(Math.random() * 2);
      xMagnitude = randomBool ? 0 : -1 * xMagnitude;
      yMagnitude = !randomBool ? 0 : -1 * yMagnitude;
    } else {
      xMagnitude =
        this.target.pos.x + xMagnitude > MAX_X_SPAWN ||
        this.target.pos.x + xMagnitude < MIN_X_SPAWN
          ? 0
          : xMagnitude;

      yMagnitude =
        this.target.pos.y + yMagnitude > MAX_Y_SPAWN ||
        this.target.pos.y + yMagnitude < MIN_Y_SPAWN
          ? 0
          : yMagnitude;
    }

    return ex.vec(
      xMagnitude + this.target.pos.x,
      yMagnitude + this.target.pos.y
    );
  }
}
