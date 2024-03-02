import * as ex from "excalibur";
import { HoldableItem } from "../items/holdableItem";

export abstract class CounterBase extends ex.Actor {
  private sprite: ex.Graphic;
  protected heldItem?: HoldableItem;

  constructor({ x, y, sprite }: { x: number; y: number; sprite: ex.Graphic }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName("counter"),
      collider: ex.Shape.Box(86, 80),
    });

    this.sprite = sprite;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.show(this.sprite);

    const counterBox = new ex.Actor({
      pos: this.pos,
      collisionType: ex.CollisionType.Fixed,
      collider: ex.Shape.Box(63, 58, ex.Vector.Half, ex.vec(0, 1)),
    });

    engine.add(counterBox);
  }

  // Methods to invoke when player interacts with counter
  // Returns taken food
  public abstract onTake(): HoldableItem | undefined;
  // Returns success status
  public abstract onGive(food: HoldableItem): boolean;
}
