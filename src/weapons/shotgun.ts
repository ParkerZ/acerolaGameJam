import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileShotgun } from "./projectiles/projectileShotgun";

export class Shotgun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 500,
      movementPenalty: 125,
      Projectile: ProjectileShotgun,
      numProjectiles: 5,
      spreadTotalAngleRadians: Math.PI / 5,
    });
  }
}
