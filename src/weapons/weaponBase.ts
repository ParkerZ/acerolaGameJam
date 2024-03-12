import * as ex from "excalibur";
import { ProjectileBase } from "./projectiles/projectileBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";
import { getElapsedTime } from "../util";
import { ProjectileHandgun } from "./projectiles/projectileHandgun";
import { ProjectileRayGun } from "./projectiles/projectileRaygun";

export class WeaponBase extends ex.Actor {
  protected cooldownMS: number;
  protected onCooldown: boolean = false;
  protected nearCooldownEnd: boolean = false;
  protected Projectile:
    | typeof ProjectileKnife
    | typeof ProjectileHandgun
    | typeof ProjectileRayGun;
  protected movementPenalty: number;
  protected numProjectiles: number;
  protected spreadTotalAngleRadians: number;
  protected lastAttackTime?: Date;
  protected animation?: ex.Animation;
  protected animationTimeoutMs: number = 0;

  constructor({
    cooldownMS,
    movementPenalty,
    Projectile,
    numProjectiles = 1,
    spreadTotalAngleRadians = 0,
  }: {
    cooldownMS: number;
    movementPenalty: number;
    Projectile:
      | typeof ProjectileKnife
      | typeof ProjectileHandgun
      | typeof ProjectileRayGun;
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

  public setOnCooldown(val: boolean) {
    this.onCooldown = val;
    this.nearCooldownEnd = val;
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

      if (this.animation) {
        const animation = new ex.Actor({
          x: playerPos.x + direction.x * 50,
          y: playerPos.y + direction.y * 50,
          rotation: newDir.toAngle() + Math.PI / 2,
          z: 5,
        });

        animation.graphics.use(this.animation.clone());

        engine.add(animation);

        engine.clock.schedule(() => {
          animation.kill();
          engine.remove(animation);
        }, this.animationTimeoutMs);
      }
    }
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
