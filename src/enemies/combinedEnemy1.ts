import * as ex from "excalibur";
import { EnemyBase } from "./enemyBase";
import { Player } from "../player";
import { ATTACK_FORCE, ATTACK_RANGE, DAMAGE, SPEED } from "./enemy1";
import { CoinPickup } from "../items/coinPickup";
import { mainSpriteSheet } from "../resources";

export class CombinedEnemy1 extends EnemyBase {
  constructor({
    x,
    y,
    target,
    numCombined,
    health,
    speedModifier,
  }: {
    x: number;
    y: number;
    target: Player;
    numCombined: number;
    health: number;
    speedModifier: number;
  }) {
    super({
      x,
      y,
      target,
      speed: SPEED + 50 + speedModifier,
      damage: numCombined * DAMAGE,
      maxHealth: health,
      attackRange: ATTACK_RANGE,
      attackForce: ATTACK_FORCE,
      sprite: mainSpriteSheet.getSprite(18, 8)?.clone() as ex.Sprite,
      Pickup: CoinPickup,
    });
  }
}
