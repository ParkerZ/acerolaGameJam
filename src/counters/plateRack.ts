import * as ex from "excalibur";
import { plateRackSprite } from "../resources";
import { CounterBase } from "./counterBase";
import { Plate } from "../items/plate";
import { HoldableItem } from "../items/holdableItem";

export class PlateRack extends CounterBase {
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
      sprite: plateRackSprite,
      rotation,
    });
  }

  public onTake() {
    return new Plate({ x: 0, y: 0 });
  }

  public onGive(food: HoldableItem) {
    return false;
  }
}
