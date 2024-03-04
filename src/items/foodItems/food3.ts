import * as ex from "excalibur";
import { mainSpriteSheet } from "../../resources";
import { FoodBase } from "./foodBase";
import { FoodType } from "../../types";

export class Food3 extends FoodBase {
  sprite = mainSpriteSheet.getSprite(20, 8)?.clone() as ex.Sprite;
  choppedSprite = mainSpriteSheet.getSprite(20, 9)?.clone() as ex.Sprite;
  maxHealth = 19;
  foodType: FoodType = "food3";

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
