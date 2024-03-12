import * as ex from "excalibur";
import { WeaponBase } from "./weaponBase";
import { ProjectileKnife } from "./projectiles/projectileKnife";
import { slashAnimation } from "../resources";

export class Knife extends WeaponBase {
  animation = slashAnimation;
  animationTimeoutMs = 90;

  constructor() {
    super({
      cooldownMS: 300,
      movementPenalty: 0,
      Projectile: ProjectileKnife,
    });
  }
}
