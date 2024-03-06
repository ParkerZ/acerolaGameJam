import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";
import { bulletSprite } from "../../resources";

export class ProjectileHandgun extends ProjectileBase {
  speed = 1250;

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
      decayMS: 250,
      damage: 13,
      knockBack: 250,
      collider: ex.Shape.Box(bulletSprite.width, bulletSprite.height),
    });
  }
}
