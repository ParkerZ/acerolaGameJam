import * as ex from "excalibur";
import { mainSpriteSheet } from "../../resources";
import { FoodBase } from "./foodBase";

export class Food1 extends FoodBase {
  sprite = mainSpriteSheet.getSprite(23, 8)?.clone() as ex.Sprite;
  choppedSprite = mainSpriteSheet.getSprite(24, 8)?.clone() as ex.Sprite;
  health = 25;
  foodType = "food1";

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);
  }
}