import * as ex from "excalibur";
import { lettuceChoppedSprite } from "../../resources";
import { FoodBase } from "./foodBase";
import { FoodType } from "../../types";
import { FOOD_TYPE_SPRITE_MAP } from "../../constants";

export class Food1 extends FoodBase {
  sprite = FOOD_TYPE_SPRITE_MAP["food1"];
  choppedSprite = lettuceChoppedSprite;
  maxHealth = 35;
  foodType: FoodType = "food1";

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
