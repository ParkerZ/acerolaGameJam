import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileRayGun } from "./projectiles/projectileRaygun";

// TODO: fix multi food hit
export class Raygun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 5,
      movementPenalty: 150,
      Projectile: ProjectileRayGun,
    });
  }
}
