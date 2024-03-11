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
import { shuffleArray } from "../util";
import { EnemyDiedEvent } from "../types";
import { ActorEvents } from "excalibur/build/dist/Actor";

const halfX = 500;
const halfY = 400;
const spawnPoints = [
  ex.vec(-halfX, -halfY),
  ex.vec(-halfX, halfY / 2 - halfY),
  ex.vec(-halfX, 0),
  ex.vec(-halfX, (3 * halfY) / 2 - halfY),
  ex.vec(-halfX, halfY),
  ex.vec(halfX, -halfY),
  ex.vec(halfX, halfY / 2 - halfY),
  ex.vec(halfX, (2 * halfY) / 2 - halfY),
  ex.vec(halfX, (3 * halfY) / 2 - halfY),
  ex.vec(halfX, halfY),
  ex.vec(halfX / 2 - halfX, -halfY),
  ex.vec(0, -halfY),
  ex.vec((3 * halfX) / 2 - halfX, -halfY),
  ex.vec(halfX / 2 - halfX, halfY),
  ex.vec(0, halfY),
  ex.vec((3 * halfX) / 2 - halfX, halfY),
];

export class EnemySpawner extends ex.Actor {
  public events = new ex.EventEmitter<
    ActorEvents & { enemydied: EnemyDiedEvent }
  >();

  private Enemy: typeof Enemy1;
  private target: Player;
  private spawnRateMs: number;
  private spawnCap: number;
  private isEnabled: boolean = true;
  private enemies: ex.Actor[] = [];
  private lastTargetPos: ex.Vector = ex.Vector.Zero;
  private speedModifier: number = 0;
  private stickyCount = 0;

  private spawnPoints: ex.Vector[] = [];
  private spawnIndex: number = 0;

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

    this.spawnIndex = Math.floor(Math.random() * this.spawnPoints.length);
    this.spawnPoints = shuffleArray(spawnPoints);
    this.spawnEnemy(engine);

    engine.clock.schedule(() => {
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

    this.addEnemy(engine, newEnemy);

    newEnemy.events.on("combineenemies", ({ enemiesToCombine }) => {
      newEnemy.events.clear();

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
      newEnemy.events.clear();
      if (newEnemy instanceof StickyEnemy1) {
        this.stickyCount--;
      }

      const enemyToRemove = this.enemies.findIndex(
        (enemy) => enemy.name == newEnemy.name
      );

      if (enemyToRemove === -1) {
        return;
      }

      this.enemies.splice(enemyToRemove, 1);
      this.events.emit("enemydied");
    });
  }

  /**
   * Gets the next spawn point from a list of potential options.
   * If the chosen option might be off the map, try again.
   */
  private getSmartRandomPosition(engine: ex.Engine<any>): ex.Vector {
    const point = this.spawnPoints[this.spawnIndex];
    this.spawnIndex = (this.spawnIndex + 1) % 16;

    if (
      (this.target.pos.x < 0 && this.target.pos.x + point.x < MIN_X_SPAWN) ||
      (this.target.pos.x > 0 && this.target.pos.x + point.x > MAX_X_SPAWN) ||
      (this.target.pos.y < 0 && this.target.pos.y + point.y < MIN_Y_SPAWN) ||
      (this.target.pos.y > 0 && this.target.pos.y + point.y > MAX_Y_SPAWN)
    ) {
      return this.getSmartRandomPosition(engine);
    }

    return point.add(this.target.pos);
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    this.isEnabled = false;
    this.enemies.forEach((enemy) => {
      enemy.kill();
      scene.engine.remove(enemy);
    });
  }
}
