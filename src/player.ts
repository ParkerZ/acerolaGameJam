import * as ex from "excalibur";
import { mainSpriteSheet } from "./resources";
import { CounterBase } from "./counters/counterBase";
import { Knife } from "./weapons/knife";
import { WeaponBase } from "./weapons/weaponBase";
import { HoldableItem } from "./items/holdableItem";

export class Player extends ex.Actor {
  private velocity = 400;
  private targetCounter: CounterBase | undefined;
  private heldItem: HoldableItem | undefined;
  private weapon: WeaponBase;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Capsule(48, 48),
    });

    this.weapon = new Knife();
  }

  onInitialize(engine: ex.Engine<any>): void {
    const sprite = mainSpriteSheet.getSprite(8, 7)?.clone() as ex.Sprite;
    this.graphics.show(sprite);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
    this.on("collisionend", (evt) => this.collisionEnd(engine, evt));

    engine.input.pointers.primary.on("down", (evt) =>
      this.handleAttack(engine, evt)
    );
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    this.handleMovement(engine);
    this.handleInteraction(engine);
    // this.handleAttack(engine);
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
    if (event.button !== ex.PointerButton.Left) {
      return;
    }

    const mousePos = engine.input.pointers.primary.lastScreenPos;
    const direction = mousePos.sub(this.pos).normalize();
    this.weapon.attack(engine, direction, this.pos);
  }

  private collisionStart(
    engine: ex.Engine<any>,
    event: ex.CollisionStartEvent<ex.Actor>
  ): void {
    if (event.other instanceof CounterBase) {
      this.targetCounter = event.other;
    }
  }

  private collisionEnd(
    engine: ex.Engine<any>,
    event: ex.CollisionEndEvent<ex.Actor>
  ): void {
    if (event.other === this.targetCounter) {
      this.targetCounter = undefined;
    }
  }
}
