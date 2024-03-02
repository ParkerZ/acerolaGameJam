import * as ex from "excalibur";

export class ProjectileBase extends ex.Actor {
  private sprite: ex.Graphic;
  private decayMS: number;
  protected damage: number;

  // TODO: needs velocity, collider
  constructor({
    x,
    y,
    direction,
    decayMS,
    damage,
    sprite,
    collider,
  }: {
    x: number;
    y: number;
    direction: ex.Vector;
    decayMS: number;
    damage: number;
    sprite: ex.Graphic;
    collider: ex.PolygonCollider;
  }) {
    super({
      x,
      y,
      rotation: Math.atan2(direction.x, -direction.y),
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName("projectile"),
      collider,
    });

    this.sprite = sprite;
    this.decayMS = decayMS;
    this.damage = damage;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);

    setTimeout(() => {
      this.kill();
    }, this.decayMS);
  }

  public getDamage(): number {
    return this.damage;
  }
}
