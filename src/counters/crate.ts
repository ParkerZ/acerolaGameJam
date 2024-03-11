import * as ex from "excalibur";
import { crateSprite } from "../resources";
import { CounterBase } from "./counterBase";
import { FoodBase } from "../items/foodItems/foodBase";

export class Crate extends CounterBase {
  private Food: typeof FoodBase;

  constructor({
    x,
    y,
    Food,
    rotation = 0,
  }: {
    x: number;
    y: number;
    Food: typeof FoodBase;
    rotation?: number;
  }) {
    const graphicMembers = [
      {
        graphic: crateSprite,
        offset: ex.Vector.Zero,
      },
    ];

    const foodSprite = new Food({ x: 0, y: 0 }).getSprite();
    if (foodSprite) {
      const sprite = foodSprite.clone();
      sprite.rotation -= rotation;
      graphicMembers.push({
        graphic: sprite as ex.Sprite,
        offset: ex.Vector.Zero,
      });
    }

    super({
      x,
      y,
      sprite: new ex.GraphicsGroup({
        members: graphicMembers,
      }),
      rotation,
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
