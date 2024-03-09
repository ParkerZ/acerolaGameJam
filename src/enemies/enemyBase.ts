import * as ex from "excalibur";
import { Player } from "../player";
import { StatusBar } from "../statusBar";
import { CoinPickup } from "../items/coinPickup";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { EnemiesCombineEvent, EnemyDiedEvent } from "../types";

export class EnemyBase extends ex.Actor {
  public events = new ex.EventEmitter<
    ActorEvents & {
      enemydied: EnemyDiedEvent;
      combineenemies: EnemiesCombineEvent;
    }
  >();

  protected maxHealth: number;
  protected health: number;
  protected damage: number;
  protected speed: number;
  protected speedAccelerationMs: number;
  protected canAcc: boolean = true;
  protected target: Player;
  protected attackRange: number;
  protected healthBar: StatusBar;
  protected hasHealthBar: boolean = false;
  protected sprite: ex.Graphic;
  protected Pickup?: typeof CoinPickup;

  protected attackForce: number;
  protected knockBackForce: ex.Vector = ex.Vector.Zero;

  constructor({
    x,
    y,
    maxHealth,
    damage,
    speed,
    speedAccelerationMs = 200,
    target,
    attackRange,
    attackForce,
    sprite,
    Pickup,
  }: {
    x: number;
    y: number;
    maxHealth: number;
    damage: number;
    speed: number;
    speedAccelerationMs?: number;
    target: Player;
    attackRange: number;
    attackForce: number;
    sprite: ex.Graphic;
    Pickup?: typeof CoinPickup;
  }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Capsule(24, 24),
    });

    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.damage = damage;
    this.speed = speed;
    this.speedAccelerationMs = speedAccelerationMs;
    this.target = target;
    this.attackRange = attackRange;
    this.attackForce = attackForce;
    this.sprite = sprite;
    this.Pickup = Pickup;

    this.healthBar = new StatusBar({
      x: 0,
      y: 0,
      z: 1,
      maxVal: this.maxHealth,
      size: "sm",
      color: ex.Color.Green,
    });
  }

  public addKnockbackForce(knockBack: ex.Vector) {
    this.knockBackForce = this.knockBackForce.add(knockBack);
  }

  public getHealth() {
    return Math.max(this.health, 0);
  }

  public onHit(damage: number, knockBackForce: ex.Vector) {
    this.health -= damage;
    this.healthBar.setCurrVal(Math.max(this.health, 0));
    this.addKnockbackForce(knockBackForce);
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);

    // this.startAcceleration(engine);wd
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.health < this.maxHealth) {
      this.healthBar.setPos(
        ex
          .vec(engine.halfDrawWidth, engine.halfDrawHeight + 30)
          .add(this.pos.sub(engine.currentScene.camera.pos))
      );

      if (!this.hasHealthBar) {
        this.hasHealthBar = true;
        engine.add(this.healthBar);
      }
    }

    if (this.health <= 0) {
      if (this.Pickup) {
        const coin = new this.Pickup({
          x: this.pos.x,
          y: this.pos.y,
          player: this.target,
        });
        engine.add(coin);
      }

      this.events.emit("enemydied");
      this.kill();
    }

    const direction = this.pos.sub(this.target.pos);
    this.sprite.rotation = Math.atan2(direction.x, -direction.y);

    const intendedVel = this.target.pos
      .sub(this.pos)
      .normalize()
      .scale(this.speed);

    this.vel = intendedVel.add(this.knockBackForce);

    if (this.knockBackForce.size > 1) {
      this.knockBackForce = this.knockBackForce.scale(0.9);
    } else {
      this.knockBackForce = ex.Vector.Zero;
    }

    const distanceToTarget = this.pos.distance(this.target.pos);
    if (distanceToTarget < this.attackRange) {
      this.target.handleEnemyAttack(
        engine,
        this.name,
        this.damage,
        intendedVel.normalize().scale(this.attackForce)
      );
    }
  }

  private startAcceleration(engine: ex.Engine<any>) {
    if (
      this.health <= 0 ||
      this.speed > this.target.getSpeed() + 5 ||
      !this.canAcc
    ) {
      return;
    }

    engine.clock.schedule(() => {
      this.speed++;
      this.startAcceleration(engine);
    }, this.speedAccelerationMs);
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    this.canAcc = false;
    this.healthBar.kill();
    scene.engine.remove(this.healthBar);
  }
}
