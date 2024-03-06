import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";

export class Knife extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 300,
      movementPenalty: 0,
      Projectile: ProjectileKnife,
    });
  }
}
