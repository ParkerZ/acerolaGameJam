import * as ex from "excalibur";
import { ProjectileBase } from "./projectiles/projectileBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";
import { getElapsedTime } from "../util";

export class WeaponBase extends ex.Actor {
  protected cooldownMS: number;
  protected onCooldown: boolean = false;
  protected nearCooldownEnd: boolean = false;
  protected Projectile: typeof ProjectileKnife;
  protected movementPenalty: number;
  protected numProjectiles: number;
  protected spreadTotalAngleRadians: number;
  protected lastAttackTime?: Date;

  constructor({
    cooldownMS,
    movementPenalty,
    Projectile,
    numProjectiles = 1,
    spreadTotalAngleRadians = 0,
  }: {
    cooldownMS: number;
    movementPenalty: number;
    Projectile: typeof ProjectileKnife;
    numProjectiles?: number;
    spreadTotalAngleRadians?: number;
  }) {
    super();

    this.cooldownMS = cooldownMS;
    this.movementPenalty = movementPenalty;
    this.Projectile = Projectile;
    this.numProjectiles = numProjectiles;
    this.spreadTotalAngleRadians = spreadTotalAngleRadians;
  }

  public getOnCooldown() {
    return this.onCooldown;
  }

  public getNearCooldownEnd() {
    return this.nearCooldownEnd;
  }

  public attack(
    engine: ex.Engine<any>,
    direction: ex.Vector,
    playerPos: ex.Vector
  ): void {
    if (this.onCooldown) {
      return;
    }

    this.lastAttackTime = new Date();

    this.nearCooldownEnd = false;
    this.onCooldown = true;

    for (let i = 0; i < this.numProjectiles; i++) {
      const angle =
        (this.spreadTotalAngleRadians * i) / this.numProjectiles -
        this.spreadTotalAngleRadians / 2;

      const newDir = ex.vec(
        direction.x * Math.cos(angle) - direction.y * Math.sin(angle),
        direction.x * Math.sin(angle) + direction.y * Math.cos(angle)
      );
      const projectile = new this.Projectile({
        x: playerPos.x,
        y: playerPos.y,
        direction: newDir,
      });
      engine.add(projectile);
    }

    // engine.clock.schedule(() => {
    //   this.onCooldown = false;
    // }, this.cooldownMS);

    // engine.clock.schedule(() => {
    //   this.nearCooldownEnd = true;
    // }, (this.cooldownMS * 3) / 4);
  }

  public getIsAttacking(): boolean {
    return this.onCooldown;
  }

  public getMovementPenalty(): number {
    return this.movementPenalty;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (!this.onCooldown || !this.lastAttackTime) {
      return;
    }

    const elapsedTime = getElapsedTime(this.lastAttackTime);

    if (elapsedTime >= this.cooldownMS) {
      this.onCooldown = false;
      return;
    }

    if (elapsedTime >= (3 * this.cooldownMS) / 4) {
      this.nearCooldownEnd = true;
    }
  }
}
