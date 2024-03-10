import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
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
      sprite: new ex.GraphicsGroup({
        members: [
          {
            graphic: mainSpriteSheet.getSprite(23, 11)?.clone() as ex.Sprite,
            offset: ex.Vector.Zero,
          },
          {
            graphic: mainSpriteSheet.getSprite(25, 7)?.clone() as ex.Sprite,
            offset: ex.Vector.Zero,
          },
        ],
      }),
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
