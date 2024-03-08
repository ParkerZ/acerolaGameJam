import * as ex from "excalibur";
import { EnemyBase } from "./enemyBase";
import { Player } from "../player";
import { CoinPickup } from "../items/coinPickup";
import { mainSpriteSheet } from "../resources";
import { selectRandom } from "../util";

export const SPEED = 150;
export const DAMAGE = 10; // 15
export const ATTACK_RANGE = 41;
export const ATTACK_FORCE = 400;

export class Enemy1 extends EnemyBase {
  constructor({
    x,
    y,
    target,
    speedModifier,
  }: {
    x: number;
    y: number;
    target: Player;
    speedModifier: number;
  }) {
    super({
      x,
      y,
      target,
      speed: SPEED + speedModifier,
      damage: DAMAGE,
      maxHealth: 25,
      attackRange: ATTACK_RANGE,
      attackForce: ATTACK_FORCE,
      sprite: mainSpriteSheet.getSprite(19, 8)?.clone() as ex.Sprite,
      Pickup: selectRandom([CoinPickup, undefined, undefined]),
    });
  }
}
