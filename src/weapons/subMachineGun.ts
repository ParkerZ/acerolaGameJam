import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileSubMachineGun } from "./projectiles/projectileSubMachineGun";

export class SubMachineGun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 40,
      movementPenalty: 150,
      Projectile: ProjectileSubMachineGun,
    });
  }
}
