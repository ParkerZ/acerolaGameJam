import * as ex from "excalibur";
import { Wall } from "../../wall";
import { FoodBase } from "../../items/foodItems/foodBase";

export class ProjectileBase extends ex.Actor {
  private sprite: ex.Graphic;
  private decayMS: number;
  private direction: ex.Vector;

  protected damage: number;
  protected speed: number = 0;

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
    this.direction = direction;
    this.damage = damage;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);
    this.vel = ex.vec(
      this.direction.x * this.speed,
      this.direction.y * this.speed
    );

    setTimeout(() => {
      this.kill();
    }, this.decayMS);
  }

  public getDamage(): number {
    return this.damage;
  }

  onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact
  ): void {
    if (
      other.owner instanceof Wall ||
      (other.owner instanceof FoodBase && other.owner.getHealth() > 0)
    ) {
      this.kill();
    }
  }
}
