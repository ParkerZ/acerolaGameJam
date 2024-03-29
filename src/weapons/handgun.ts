import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileHandgun } from "./projectiles/projectileHandgun";

export class Handgun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 300,
      movementPenalty: 90,
      Projectile: ProjectileHandgun,
    });
  }
}
