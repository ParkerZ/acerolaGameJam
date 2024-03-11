import * as ex from "excalibur";
import { HoldableItem } from "../items/holdableItem";
import { COLORS } from "../constants";
import { counterOutlineSprite } from "../resources";

export abstract class CounterBase extends ex.Actor {
  private sprite: ex.Graphic;
  protected heldItem?: HoldableItem;
  private activeActor?: ex.Actor;
  private blockingCollider: ex.Collider = ex.Shape.Box(
    63,
    58,
    ex.Vector.Half,
    ex.vec(0, 1)
  );

  constructor({
    x,
    y,
    sprite,
    rotation,
  }: {
    x: number;
    y: number;
    sprite: ex.Graphic;
    rotation: number;
  }) {
    super({
      x,
      y,
      z: 2,
      rotation,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Capsule(74, 74),
    });

    this.sprite = sprite;
  }

  public getBlockingCollider() {
    return this.blockingCollider;
  }

  public getPos() {
    return this.pos;
  }

  public setActive(engine: ex.Engine<any>, val: boolean) {
    if (val) {
      this.activeActor = new ex.Actor({ pos: this.pos, z: -1 });
      this.activeActor.graphics.use(counterOutlineSprite);
      engine.add(this.activeActor);
      return;
    }

    if (this.activeActor) {
      this.activeActor.kill();
      engine.remove(this.activeActor);
      this.activeActor = undefined;
    }
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);
  }

  // Methods to invoke when player interacts with counter
  // Returns taken food
  public abstract onTake(): HoldableItem | undefined;
  // Returns success status
  public abstract onGive(food: HoldableItem): boolean;
}
