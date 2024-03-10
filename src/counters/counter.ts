import * as ex from "excalibur";
import { counterSprite } from "../resources";
import { CounterBase } from "./counterBase";
import { HoldableItem } from "../items/holdableItem";
import { Plate } from "../items/plate";

export class Counter extends CounterBase {
  constructor({
    x,
    y,
    rotation = Math.PI / 2,
  }: {
    x: number;
    y: number;
    rotation?: number;
  }) {
    super({
      x,
      y,
      sprite: counterSprite,
      rotation,
    });
  }

  public onTake() {
    if (!this.heldItem) {
      return undefined;
    }

    const result = this.heldItem;
    this.heldItem = undefined;
    return result;
  }

  public onGive(item: HoldableItem) {
    if (this.heldItem instanceof Plate) {
      return this.heldItem.onGive(item);
    }

    if (!this.heldItem) {
      this.heldItem = item;
      this.heldItem.setPos(this.pos);
      return true;
    }

    return false;
  }
}
