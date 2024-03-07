import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";

export class ProjectileRayGun extends ProjectileBase {
  constructor({
    x,
    y,
    direction,
  }: {
    x: number;
    y: number;
    direction: ex.Vector;
  }) {
    let xPos = x + direction.x * 15;
    let yPos = y + direction.y * 15;
    super({
      x: xPos,
      y: yPos,
      direction,
      sprite: new ex.Line({
        start: ex.vec(0, -400),
        end: ex.vec(0, 400),
        color: ex.Color.Cyan,
        thickness: 5,
      }),
      decayMS: 5,
      damage: 0.5,
      knockBack: 1,
      collider: ex.Shape.Box(5, 800),
      canMultiHitEnemy: true,
    });
  }
}
