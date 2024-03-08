import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileHeavyMachineGun } from "./projectiles/projectileHeavyMachineGun";

export class HeavyMachineGun extends WeaponBase {
  constructor() {
    super({
      cooldownMS: 110,
      movementPenalty: 200,
      Projectile: ProjectileHeavyMachineGun,
    });
  }
}
