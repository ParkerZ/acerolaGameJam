import * as ex from "excalibur";
import { Wall } from "../../wall";
import { FoodBase } from "../../items/foodItems/foodBase";
import { EnemyBase } from "../../enemies/enemyBase";

export class ProjectileBase extends ex.Actor {
  private sprite: ex.Graphic;
  private decayMS: number;
  private direction: ex.Vector;
  private knockBack: number;
  private canMultiHitEnemy: boolean;

  protected damage: number;
  protected speed: number = 0;

  protected collidedObjects: Set<Wall | EnemyBase | FoodBase> = new Set();
  protected startingPos: ex.Vector;

  constructor({
    x,
    y,
    direction,
    decayMS,
    damage,
    knockBack,
    sprite,
    collider,
    canMultiHitEnemy = false,
  }: {
    x: number;
    y: number;
    direction: ex.Vector;
    decayMS: number;
    damage: number;
    knockBack: number;
    sprite: ex.Graphic;
    collider: ex.PolygonCollider;
    canMultiHitEnemy?: boolean;
  }) {
    super({
      x,
      y,
      z: 2,
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
    this.canMultiHitEnemy = canMultiHitEnemy;
    this.startingPos = ex.vec(x, y);
  }

  public getKnockbackForce(): ex.Vector {
    return this.direction.scale(this.knockBack);
  }

  public getDamage(): number {
    return this.damage;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);
    this.vel = ex.vec(
      this.direction.x * this.speed,
      this.direction.y * this.speed
    );

    engine.clock.schedule(() => {
      this.kill();
    }, this.decayMS);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    const collisions = Array.from(this.collidedObjects);

    if (!collisions.length) {
      return;
    }

    if (
      this.canMultiHitEnemy &&
      collisions.some((obj) => obj instanceof EnemyBase)
    ) {
      // Handle hitting one or more enemies if piercing enabled
      collisions.forEach((obj) => {
        if (!(obj instanceof EnemyBase)) {
          return;
        }

        obj.onHit(this.getDamage(), this.getKnockbackForce());
      });
    } else {
      // Handle hitting one of multiple entities
      let closestNonWall = {
        object: collisions[0],
        distance: this.calculateDistanceFromStartinPos(collisions[0]),
      };

      collisions.forEach((obj) => {
        if (obj instanceof Wall) {
          return;
        }

        const distance = this.calculateDistanceFromStartinPos(obj);
        if (distance < closestNonWall.distance) {
          closestNonWall = {
            object: obj,
            distance,
          };
        }
      });

      if (!(closestNonWall.object instanceof Wall)) {
        closestNonWall.object.onHit(this.getDamage(), this.getKnockbackForce());
      }
    }

    this.kill();
  }

  private calculateDistanceFromStartinPos(
    object: Wall | EnemyBase | FoodBase
  ): number {
    return object.pos.distance(this.startingPos);
  }

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
      this.collidedObjects.add(other.owner);
    }
  }
}
