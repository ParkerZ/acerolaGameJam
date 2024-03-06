import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileShotgun } from "./projectiles/projectileShotgun";

export class Shotgun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 500,
      movementPenalty: 150,
      Projectile: ProjectileShotgun,
      numProjectiles: 5,
      spreadTotalAngleRadians: Math.PI / 6, // ~34 degrees
    });
  }
}
