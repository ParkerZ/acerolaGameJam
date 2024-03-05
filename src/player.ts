import * as ex from "excalibur";
import { mainSpriteSheet } from "./resources";
import { CounterBase } from "./counters/counterBase";
import { Knife } from "./weapons/knife";
import { WeaponBase } from "./weapons/weaponBase";
import { HoldableItem } from "./items/holdableItem";
import { Plate } from "./items/plate";
import { StatusBar } from "./statusBar";
import { Handgun } from "./weapons/handgun";
import { Shotgun } from "./weapons/shotgun";
import { Sniper } from "./weapons/sniper";

export class Player extends ex.Actor {
  // TODO: coin counter
  private velocity = 400;
  private targetCounter: CounterBase | undefined;
  private possibleCounters: CounterBase[] = [];
  private heldItem: HoldableItem | undefined;
  private weapon: WeaponBase;
  private numCoins: number = 0;

  private health: number = 100;
  private healthBar: StatusBar;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Capsule(48, 48),
    });

    this.weapon = new Sniper();
    this.healthBar = new StatusBar({
      x: 0,
      y: 0,
      maxVal: this.health,
      size: "lg",
    });
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public addCoins(val: number) {
    this.numCoins += val;
    console.log("Player coins", this.numCoins);
  }

  public loseHealth(val: number) {
    this.health -= val;
    this.healthBar.setCurrVal(Math.max(this.health, 0));
  }

  onInitialize(engine: ex.Engine<any>): void {
    const sprite = mainSpriteSheet.getSprite(8, 7)?.clone() as ex.Sprite;
    this.graphics.show(sprite);

    this.healthBar.setPos(
      ex.vec(engine.halfDrawWidth, (engine.drawHeight * 94) / 100)
    );
    engine.add(this.healthBar);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
    this.on("collisionend", (evt) => this.collisionEnd(engine, evt));

    engine.input.pointers.primary.on("down", (evt) =>
      this.handleAttack(engine, evt)
    );
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    this.handleMovement(engine);
    this.handleInteraction(engine);
  }

  private handleMovement(engine: ex.Engine<any>): void {
    // Change movement speed if attacking
    // TODO: should probably respect projectile instead of weapon to slow down?
    const velocity = this.weapon.getIsAttacking()
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

    if (!moveX && !moveY) {
      this.vel = ex.vec(0, 0);
      return;
    }

    const moveDir = ex.vec(moveX, moveY).normalize().scale(velocity);
    this.vel = moveDir;
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

  private handleAttack(engine: ex.Engine<any>, event: ex.PointerEvent) {
    if (event.button !== ex.PointerButton.Left || this.heldItem) {
      return;
    }

    const mousePos = engine.input.pointers.primary.lastScreenPos;
    const direction = mousePos.sub(this.pos).normalize();
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
