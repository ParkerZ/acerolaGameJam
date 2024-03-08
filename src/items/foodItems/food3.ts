import * as ex from "excalibur";
import { mainSpriteSheet } from "../../resources";
import { FoodBase } from "./foodBase";
import { FoodType } from "../../types";
import { FOOD_TYPE_SPRITE_MAP } from "../../constants";

export class Food3 extends FoodBase {
  sprite = FOOD_TYPE_SPRITE_MAP["food3"];
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
