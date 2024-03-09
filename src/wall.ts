import * as ex from "excalibur";

export class Wall extends ex.Actor {
  constructor({
    anchor = ex.Vector.Zero,
    collider,
  }: {
    anchor?: ex.Vector;
    collider: ex.CompositeCollider;
  }) {
    super({
      x: 0,
      y: 0,
      z: 1,
      collisionType: ex.CollisionType.Fixed,
      collider,
      anchor,
    });
  }
}
