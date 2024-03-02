import * as ex from "excalibur";
import { ProjectileBase } from "./projectiles/projectileBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";

export class WeaponBase extends ex.Actor {
  protected cooldownMS: number;
  protected onCooldown: boolean = false;
  protected Projectile: typeof ProjectileKnife;
  protected movementPenalty: number;

  constructor({
    cooldownMS,
    movementPenalty,
    Projectile,
  }: {
    cooldownMS: number;
    movementPenalty: number;
    Projectile: typeof ProjectileKnife;
  }) {
    super();

    this.cooldownMS = cooldownMS;
    this.movementPenalty = movementPenalty;
    this.Projectile = Projectile;
  }

  public attack(
    engine: ex.Engine<any>,
    direction: ex.Vector,
    playerPos: ex.Vector
  ): void {
    if (this.onCooldown) {
      return;
    }

    this.onCooldown = true;

    const projectile = new this.Projectile({
      x: playerPos.x,
      y: playerPos.y,
      direction,
    });
    engine.add(projectile);
    // weapon controls velocity
    // attack controls direction

    setTimeout(() => {
      this.onCooldown = false;
    }, this.cooldownMS);
  }

  public getIsAttacking(): boolean {
    return this.onCooldown;
  }

  public getMovementPenalty(): number {
    return this.movementPenalty;
  }
}
