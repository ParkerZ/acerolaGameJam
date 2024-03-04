import * as ex from "excalibur";
import { mainSpriteSheet } from "../../resources";
import { FoodBase } from "./foodBase";
import { FoodType } from "../../types";

export class Food2 extends FoodBase {
  sprite = mainSpriteSheet.getSprite(24, 6)?.clone() as ex.Sprite;
  choppedSprite = mainSpriteSheet.getSprite(25, 6)?.clone() as ex.Sprite;
  maxHealth = 31;
  foodType: FoodType = "food2";

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
