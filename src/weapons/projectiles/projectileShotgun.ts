import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";
import { buckshotSprite } from "../../resources";

export class ProjectileShotgun extends ProjectileBase {
  speed = 1000;

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
      sprite: buckshotSprite,
      decayMS: 100,
      damage: 5,
      knockBack: 150,
      collider: ex.Shape.Box(buckshotSprite.width, buckshotSprite.height),
    });
  }
}
