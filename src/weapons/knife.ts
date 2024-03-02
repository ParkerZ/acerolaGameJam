import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";

export class Knife extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 200,
      movementPenalty: 400,
      Projectile: ProjectileKnife,
    });
  }
}
