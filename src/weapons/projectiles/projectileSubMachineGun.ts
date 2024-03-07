import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";
import { buckshotSprite } from "../../resources";

export class ProjectileSubMachineGun extends ProjectileBase {
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
      sprite: buckshotSprite,
      decayMS: 150,
      damage: 4,
      knockBack: 120,
      collider: ex.Shape.Box(buckshotSprite.width, buckshotSprite.height),
    });
  }
}
