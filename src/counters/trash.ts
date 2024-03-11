import * as ex from "excalibur";
import { trashSprite } from "../resources";
import { CounterBase } from "./counterBase";
import { HoldableItem } from "../items/holdableItem";

export class Trash extends CounterBase {
  constructor({
    x,
    y,
    rotation = 0,
  }: {
    x: number;
    y: number;
    rotation?: number;
  }) {
    super({
      x,
      y,
      sprite: trashSprite,
      rotation,
    });
  }

  public onTake() {
    return undefined;
  }

  public onGive(item: HoldableItem) {
    item.kill();
    return true;
  }
}
