import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileSniper } from "./projectiles/projectileSniper";

export class Sniper extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 800,
      movementPenalty: 150,
      Projectile: ProjectileSniper,
    });
  }
}
