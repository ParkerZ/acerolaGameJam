import * as ex from "excalibur";
import { mainSpriteSheet } from "../../resources";
import { FoodBase } from "./foodBase";
import { FoodType } from "../../types";
import { FOOD_TYPE_SPRITE_MAP } from "../../constants";

export class Food2 extends FoodBase {
  sprite = FOOD_TYPE_SPRITE_MAP["food2"];
  choppedSprite = mainSpriteSheet.getSprite(25, 6)?.clone() as ex.Sprite;
  maxHealth = 35;
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
