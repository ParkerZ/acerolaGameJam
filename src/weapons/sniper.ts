import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileSniper } from "./projectiles/projectileSniper";

export class Sniper extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 1000,
      movementPenalty: 175,
      Projectile: ProjectileSniper,
    });
  }
}
