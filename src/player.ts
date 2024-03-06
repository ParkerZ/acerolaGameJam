import * as ex from "excalibur";
import { mainSpriteSheet } from "./resources";
import { CounterBase } from "./counters/counterBase";
import { Knife } from "./weapons/knife";
import { WeaponBase } from "./weapons/weaponBase";
import { HoldableItem } from "./items/holdableItem";
import { Plate } from "./items/plate";
import { StatusBar } from "./statusBar";
import { WeaponType } from "./types";
import { selectRandom } from "./util";
import { Handgun } from "./weapons/handgun";
import { Shotgun } from "./weapons/shotgun";
import { Sniper } from "./weapons/sniper";

export class Player extends ex.Actor {
  // TODO: coin counter
  private isEnabled = true;
  private velocity = 400;
  private targetCounter: CounterBase | undefined;
  private possibleCounters: CounterBase[] = [];
  private heldItem: HoldableItem | undefined;
  private weapon: WeaponBase;
  private numCoins: number = 0;

  private sprite: ex.Graphic;

  private maxHealth: number = 100;
  private health: number = 100;
  private healthBar: StatusBar;

  private damageCooldownMap: Record<string, number> = {};
  private damageCooldownMs = 500;
  protected knockBackForce: ex.Vector = ex.Vector.Zero;

  private isAttacking: boolean = false;
  private attackInputs: number = 0;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      z: 2,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Capsule(48, 48),
    });

    const Weapon = selectRandom([Knife, Handgun, Shotgun, Sniper]);
    this.weapon = new Knife();
    this.healthBar = new StatusBar({
      x: 0,
      y: 0,
      maxVal: this.maxHealth,
      size: "lg",
    });

    this.sprite = mainSpriteSheet.getSprite(17, 13)?.clone() as ex.Sprite;
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public setIsEnabled(val: boolean) {
    this.isEnabled = val;
  }

  public getCoins() {
    return this.numCoins;
  }

  public addCoins(val: number) {
    this.numCoins += val;
    console.log("Player coins", this.numCoins);
  }

  public loseCoins(val: number) {
    this.numCoins -= val;
    console.log("Player coins", this.numCoins);
  }

  public loseHealth(val: number) {
    this.health -= val;
    this.healthBar.setCurrVal(Math.max(this.health, 0));
  }

  public healToFull() {
    this.health = this.maxHealth;
    this.healthBar.setCurrVal(Math.max(this.health));
  }

  public switchWeapon(Weapon: WeaponType) {
    this.weapon.kill();
    this.weapon = new Weapon();
  }

  public handleEnemyAttack(
    enemyName: string,
    damage: number,
    knockBackForce: ex.Vector
  ) {
    if (this.damageCooldownMap[enemyName]) {
      return;
    }

    this.damageCooldownMap[enemyName] = damage;
    this.loseHealth(damage);
    this.knockBackForce = this.knockBackForce.add(knockBackForce);

    setTimeout(() => {
      delete this.damageCooldownMap[enemyName];
    }, this.damageCooldownMs);
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);

    this.healthBar.setPos(
      ex.vec(engine.halfDrawWidth, (engine.drawHeight * 94) / 100)
    );
    engine.add(this.healthBar);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
    this.on("collisionend", (evt) => this.collisionEnd(engine, evt));

    engine.input.pointers.primary.on("down", (evt) =>
      this.handlePointerEvent(evt)
    );

    engine.input.pointers.primary.on("up", (evt) =>
      this.handlePointerEvent(evt)
    );
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (!this.isEnabled) {
      return;
    }

    this.handleMovement(engine);
    this.handleInteraction(engine);
    this.handleAttack(engine);

    const mousePos = engine.input.pointers.primary.lastScreenPos;
    const direction = mousePos.sub(
      ex.vec(engine.halfDrawWidth, engine.halfDrawHeight)
    );

    this.sprite.rotation = Math.atan2(direction.x, -direction.y);
  }

  private handlePointerEvent(event: ex.PointerEvent) {
    if (event.button !== ex.PointerButton.Left || this.heldItem) {
      return;
    }

    switch (event.type) {
      case "down":
        this.isAttacking = true;
        if (this.weapon.getNearCooldownEnd()) {
          this.attackInputs = 1;
        }
        break;
      case "up":
        this.isAttacking = false;
        break;
    }
  }

  private handleMovement(engine: ex.Engine<any>): void {
    // Change movement speed if attacking
    const velocity =
      this.isAttacking && !this.weapon.getNearCooldownEnd()
        ? this.velocity - this.weapon.getMovementPenalty()
        : this.velocity;

    let moveX = 0;
    let moveY = 0;

    if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      moveX -= velocity;
    }

    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      moveX += velocity;
    }

    if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      moveY -= velocity;
    }

    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      moveY += velocity;
    }

    const intendedVel =
      !moveX && !moveY
        ? ex.vec(0, 0)
        : ex.vec(moveX, moveY).normalize().scale(velocity);

    console.log(this.knockBackForce.size);
    if (this.knockBackForce.size > 0) {
      this.vel = intendedVel.add(this.knockBackForce);
    } else {
      this.vel = intendedVel;
    }

    if (this.knockBackForce.size > 1) {
      this.knockBackForce = this.knockBackForce.scale(0.9);
    } else {
      this.knockBackForce = ex.Vector.Zero;
    }
  }

  private handleInteraction(engine: ex.Engine<any>): void {
    if (this.heldItem && this.heldItem.getSprite()) {
      this.heldItem.setPos(this.pos);
    }

    if (
      !this.targetCounter ||
      !engine.input.keyboard.wasPressed(ex.Keys.Space)
    ) {
      return;
    }

    if (this.heldItem) {
      // clear held food if given successfully
      const giveSuccess = this.targetCounter.onGive(this.heldItem);
      if (giveSuccess) {
        this.heldItem.setIsHeld(false);
        this.heldItem = undefined;
      } else if (this.heldItem instanceof Plate) {
        const counterItem = this.targetCounter.onTake();
        if (counterItem) {
          const plateSuccess = this.heldItem.onTake(counterItem);
          if (!plateSuccess) {
            this.targetCounter.onGive(counterItem);
          }
        }
      }
    } else {
      this.heldItem = this.targetCounter.onTake();
      if (this.heldItem) {
        this.heldItem.setIsHeld(true);
        this.heldItem.setPos(this.pos);
        engine.add(this.heldItem);
      }
    }
  }

  private handleAttack(engine: ex.Engine<any>) {
    if (!this.attackInputs && !this.isAttacking) {
      return;
    }

    if (this.weapon.getOnCooldown()) {
      return;
    }

    this.attackInputs = Math.max(this.attackInputs - 1, 0);

    const mousePos = engine.input.pointers.primary.lastScreenPos;
    const direction = mousePos
      .sub(
        ex
          .vec(engine.halfDrawWidth, engine.halfDrawHeight)
          .add(this.pos.sub(engine.currentScene.camera.pos))
      )
      .normalize();
    this.weapon.attack(engine, direction, this.pos);
  }

  // when colliding with a new couunter, make it the active counter.
  // make sure to turn off highlight for previous active counter if colliding with multiple.
  // track currently colliding counters so there is a fallback.
  private collisionStart(
    engine: ex.Engine<any>,
    event: ex.CollisionStartEvent<ex.Actor>
  ): void {
    if (!(event.other instanceof CounterBase)) {
      return;
    }

    this.possibleCounters.push(event.other);

    if (this.targetCounter) {
      this.targetCounter.setActive(engine, false);
    }
    this.targetCounter = event.other;
    this.targetCounter.setActive(engine, true);
  }

  private collisionEnd(
    engine: ex.Engine<any>,
    event: ex.CollisionEndEvent<ex.Actor>
  ): void {
    if (!(event.other instanceof CounterBase)) {
      return;
    }

    this.possibleCounters.splice(
      this.possibleCounters.findIndex((c) => c === event.other),
      1
    );
    event.other.setActive(engine, false);
    if (event.other === this.targetCounter) {
      if (this.possibleCounters.length) {
        this.targetCounter = this.possibleCounters[0];
        this.targetCounter.setActive(engine, true);
      } else {
        this.targetCounter = undefined;
      }
    }
  }
}
