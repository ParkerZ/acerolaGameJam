import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";
import { bulletSprite } from "../../resources";

export class ProjectileSniper extends ProjectileBase {
  speed = 1500;

  constructor({
    x,
    y,
    direction,
  }: {
    x: number;
    y: number;
    direction: ex.Vector;
  }) {
    super({
      x: x + direction.x * 10,
      y: y + direction.y * 10,
      direction,
      sprite: bulletSprite,
      decayMS: 500,
      damage: 50,
      knockBack: 1000,
      collider: ex.Shape.Box(bulletSprite.width, bulletSprite.height),
    });
  }
}
