import * as ex from "excalibur";
import { ProjectileBase } from "./projectileBase";
import { slashSprite } from "../../resources";

export class ProjectileKnife extends ProjectileBase {
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
      x: x + direction.x * 40,
      y: y + direction.y * 40,
      direction,
      sprite: slashSprite,
      decayMS: 50,
      damage: 10,
      knockBack: 500,
      collider: ex.Shape.Box(slashSprite.width, slashSprite.height),
      canMultiHitEnemy: true,
    });
  }
}
