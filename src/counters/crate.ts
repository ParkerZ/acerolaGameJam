import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { CounterBase } from "./counterBase";
import { FoodBase } from "../items/foodItems/foodBase";

export class Crate extends CounterBase {
  private Food: typeof FoodBase;

  constructor({ x, y, Food }: { x: number; y: number; Food: typeof FoodBase }) {
    const graphicMembers = [
      {
        graphic: mainSpriteSheet.getSprite(25, 11)?.clone() as ex.Sprite,
        offset: ex.Vector.Zero,
      },
    ];

    const foodSprite = new Food({ x: 0, y: 0 }).getSprite();
    if (foodSprite) {
      graphicMembers.push({
        graphic: foodSprite as ex.Sprite,
        offset: ex.Vector.Zero,
      });
    }

    super({
      x,
      y,
      sprite: new ex.GraphicsGroup({
        members: graphicMembers,
      }),
    });

    this.Food = Food;
  }

  public onTake() {
    return new this.Food({ x: 0, y: 0 });
  }

  public onGive() {
    return false;
  }
}
