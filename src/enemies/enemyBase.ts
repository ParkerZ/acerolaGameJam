import * as ex from "excalibur";
import { Player } from "../player";
import { ProjectileBase } from "../weapons/projectiles/projectileBase";
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
  protected target: Player;
  protected attackRange: number;
  protected statusBar: StatusBar;
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
    this.target = target;
    this.attackRange = attackRange;
    this.attackForce = attackForce;
    this.sprite = sprite;
    this.Pickup = Pickup;

    this.statusBar = new StatusBar({
      x: 0,
      y: 0,
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

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.health < this.maxHealth) {
      this.statusBar.setPos(
        ex
          .vec(engine.halfDrawWidth, engine.halfDrawHeight + 30)
          .add(this.pos.sub(engine.currentScene.camera.pos))
      );
    }

    if (this.health <= 0) {
      if (this.Pickup) {
        const coin = new this.Pickup({ x: this.pos.x, y: this.pos.y });
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
        this.name,
        this.damage,
        intendedVel.normalize().scale(this.attackForce)
      );
    }
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    this.statusBar.kill();
    scene.engine.remove(this.statusBar);
  }

  private collisionStart(
    engine: ex.Engine<any>,
    event: ex.CollisionStartEvent<ex.Actor>
  ): void {
    if (event.other instanceof ProjectileBase) {
      this.takeDamage(engine, event.other.getDamage());
      this.addKnockbackForce(event.other.getKnockbackForce());
    }
  }

  private takeDamage(engine: ex.Engine<any>, damage: number) {
    this.health -= damage;
    this.updateStatusBar(engine);
    engine.add(this.statusBar);
  }

  private updateStatusBar(engine: ex.Engine<any>) {
    this.statusBar.setPos(
      ex
        .vec(engine.halfDrawWidth, engine.halfDrawHeight + 30)
        .add(this.pos.sub(engine.currentScene.camera.pos))
    );
    this.statusBar.setCurrVal(Math.max(this.health, 0));
  }
}
