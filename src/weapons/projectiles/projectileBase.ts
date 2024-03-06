import * as ex from "excalibur";
import { Wall } from "../../wall";
import { FoodBase } from "../../items/foodItems/foodBase";
import { EnemyBase } from "../../enemies/enemyBase";

export class ProjectileBase extends ex.Actor {
  private sprite: ex.Graphic;
  private decayMS: number;
  private direction: ex.Vector;
  private knockBack: number;

  protected damage: number;
  protected speed: number = 0;

  constructor({
    x,
    y,
    direction,
    decayMS,
    damage,
    knockBack,
    sprite,
    collider,
  }: {
    x: number;
    y: number;
    direction: ex.Vector;
    decayMS: number;
    damage: number;
    knockBack: number;
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
    this.knockBack = knockBack;
  }

  public getKnockbackForce(): ex.Vector {
    return this.direction.scale(this.knockBack);
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

  // TODO: prevent multi collision for knife
  onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact
  ): void {
    if (
      other.owner instanceof Wall ||
      other.owner instanceof EnemyBase ||
      (other.owner instanceof FoodBase && other.owner.getHealth() > 0)
    ) {
      this.kill();
    }
  }
}
