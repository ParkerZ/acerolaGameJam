import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { CounterBase } from "./counterBase";
import { HoldableItem } from "../items/holdableItem";

export class Trash extends CounterBase {
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
      sprite: mainSpriteSheet.getSprite(26, 11)?.clone() as ex.Sprite,
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
