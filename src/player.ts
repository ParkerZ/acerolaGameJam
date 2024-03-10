import * as ex from "excalibur";
import { mainSpriteSheet } from "./resources";
import { CounterBase } from "./counters/counterBase";
import { WeaponBase } from "./weapons/weaponBase";
import { HoldableItem } from "./items/holdableItem";
import { Plate } from "./items/plate";
import { StatusBar } from "./statusBar";
import { WeaponType } from "./types";
import { FoodBase } from "./items/foodItems/foodBase";
import { PlateRack } from "./counters/plateRack";
import { CoinHud } from "./cointHud";
import { Knife } from "./weapons/knife";

export class Player extends ex.Actor {
  private isEnabled = true;
  private velocity = 350;
  private targetCounter: CounterBase | undefined;
  private possibleCounters: CounterBase[] = [];
  private heldItem: HoldableItem | undefined;
  private weapon: WeaponBase;
  private numCoins: number = 0;

  private sprite: ex.Graphic;

  private maxHealth: number = 100;
  private health: number = 100;
  private healthBar: StatusBar;
  private coinHud: CoinHud;

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

    this.weapon = new Knife();
    this.healthBar = new StatusBar({
      x: 0,
      y: 0,
      z: 2,
      maxVal: this.maxHealth,
      size: "lg",
      color: ex.Color.fromHex("#9a4f50"),
    });
    this.coinHud = new CoinHud({
      x: 0,
      y: 0,
    });

    this.sprite = mainSpriteSheet.getSprite(25, 4)?.clone() as ex.Sprite;
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public setIsEnabled(engine: ex.Engine<any>, val: boolean) {
    if (val) {
      this.onEnable(engine);

      engine.clock.schedule(() => {
        this.isEnabled = val;
      }, 250);
    } else {
      this.isEnabled = val;
    }
  }

  public getCoins() {
    return this.numCoins;
  }

  public addCoins(val: number) {
    this.numCoins += val;
    this.coinHud.setCoins(this.numCoins);
  }

  public loseCoins(val: number) {
    this.numCoins -= val;
    this.coinHud.setCoins(this.numCoins);
  }

  public getHealthBar() {
    return this.healthBar;
  }

  public loseHealth(engine: ex.Engine<any>, val: number) {
    this.health -= val;
    this.healthBar.setCurrVal(Math.max(this.health, 0));

    if (this.health <= 0) {
      // TODO: LOSE
      engine.clock.schedule(() => {
        alert("YOU LOSE");
      }, 500);
    }
  }

  public getSpeed() {
    return this.velocity;
  }

  public getWeapon() {
    return this.weapon;
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
    engine: ex.Engine<any>,
    enemyName: string,
    damage: number,
    knockBackForce: ex.Vector
  ) {
    if (this.damageCooldownMap[enemyName]) {
      return;
    }

    this.damageCooldownMap[enemyName] = damage;
    this.loseHealth(engine, damage);
    this.knockBackForce = this.knockBackForce.add(knockBackForce);

    engine.clock.schedule(() => {
      delete this.damageCooldownMap[enemyName];
    }, this.damageCooldownMs);
  }

  public showCoinHud(engine: ex.Engine<any>) {
    engine.remove(this.coinHud);
    this.coinHud.setPos(ex.vec((engine.drawWidth * 88.9) / 100, 10));
    engine.add(this.coinHud);
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
    this.on("collisionend", (evt) => this.collisionEnd(engine, evt));

    engine.input.pointers.primary.on("down", (evt) =>
      this.handlePointerEvent(evt)
    );

    engine.input.pointers.primary.on("up", (evt) =>
      this.handlePointerEvent(evt)
    );
  }

  private registerHud(engine: ex.Engine<any>): void {
    engine.remove(this.healthBar);
    this.healthBar.setPos(
      ex.vec(engine.halfDrawWidth, (engine.drawHeight * 94) / 100)
    );
    engine.add(this.healthBar);
    this.healthBar.registerInnerBar(engine);

    this.showCoinHud(engine);
  }

  private onEnable(engine: ex.Engine<any>) {
    this.registerHud(engine);
    this.heldItem = undefined;
    this.vel = ex.Vector.Zero;
    this.isAttacking = false;
    this.attackInputs = 0;
    this.targetCounter = undefined;
    this.possibleCounters = [];
    engine.add(this.weapon);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (!this.isEnabled) {
      return;
    }

    this.handleMovement(engine);
    this.handleInteraction(engine);
    this.handleAttack(engine);

    const screenPos = ex
      .vec(engine.halfDrawWidth, engine.halfDrawHeight)
      .add(this.pos.sub(engine.currentScene.camera.pos));

    const direction =
      engine.input.pointers.primary.lastScreenPos.sub(screenPos);

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
    const velocity = !this.weapon.getNearCooldownEnd()
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
      this.isAttacking = false;
      this.heldItem.setPos(this.pos);
    }

    if (
      !this.targetCounter ||
      !engine.input.keyboard.wasPressed(ex.Keys.Space)
    ) {
      return;
    }

    if (this.heldItem) {
      const giveSuccess = this.targetCounter.onGive(this.heldItem);
      if (giveSuccess) {
        // try to give the item to targetCounter

        this.heldItem.setIsHeld(false);
        this.heldItem = undefined;
      } else if (this.heldItem instanceof Plate) {
        // if failed and holding a plate, try to pickup a chopped food if present
        const counterItem = this.targetCounter.onTake();
        if (counterItem) {
          if (
            !(
              counterItem instanceof FoodBase &&
              counterItem.getIsChopped() &&
              this.heldItem.onTake(counterItem)
            )
          ) {
            this.targetCounter.onGive(counterItem);
          }
        }
      } else if (
        this.heldItem instanceof FoodBase &&
        this.heldItem.getIsChopped() &&
        this.targetCounter instanceof PlateRack
      ) {
        const plate = this.targetCounter.onTake();
        if (plate instanceof Plate) {
          plate.onTake(this.heldItem);
          this.heldItem = plate;
          this.heldItem.setIsHeld(true);
          this.heldItem.setPos(this.pos);
          engine.add(this.heldItem);
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
