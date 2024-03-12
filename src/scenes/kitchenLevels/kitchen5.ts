import * as ex from "excalibur";
import { Player } from "../../player";
import { Crate } from "../../counters/crate";
import { Counter } from "../../counters/counter";
import { Food1 } from "../../items/foodItems/food1";
import { Trash } from "../../counters/trash";
import { Food2 } from "../../items/foodItems/food2";
import { PlateRack } from "../../counters/plateRack";
import { Order } from "../../order";
import { Food3 } from "../../items/foodItems/food3";
import { COUNTER_WIDTH } from "../../constants";
import { KitchenBase } from "./kitchenBase";
import { FoodType } from "../../types";
import { AberrantOrder } from "../../aberrantOrder";

export class Kitchen5 extends KitchenBase {
  constructor({ player }: { player: Player }) {
    super({ player });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.counters = [
      new PlateRack({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        rotation: 0,
      }),
      new Trash({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 0,
      }),
      new Trash({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 0,
      }),
      new Trash({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 0,
      }),
      new Trash({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 0,
      }),
      new Crate({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        Food: Food1,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        Food: Food2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        Food: Food3,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI,
      }),
    ];

    this.counterCollider = new ex.Actor({
      collider: new ex.CompositeCollider([
        ex.Shape.Box(
          64 * 2,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth - COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight - COUNTER_WIDTH * 2 - 32
          )
        ),
        ex.Shape.Box(
          64 * 2,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth + COUNTER_WIDTH * 1 - 32,
            engine.halfDrawHeight - COUNTER_WIDTH * 2 - 32
          )
        ),
        ex.Shape.Box(
          64 * 2,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth - COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight - COUNTER_WIDTH * 0 - 32
          )
        ),
        ex.Shape.Box(
          64 * 2,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth + COUNTER_WIDTH * 1 - 32,
            engine.halfDrawHeight + COUNTER_WIDTH * 0 - 32
          )
        ),
        ex.Shape.Box(
          64,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth - COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight + COUNTER_WIDTH * 2 - 32
          )
        ),
        ex.Shape.Box(
          64,
          64,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth + COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight + COUNTER_WIDTH * 2 - 32
          )
        ),
      ]),
      collisionType: ex.CollisionType.Fixed,
      anchor: ex.Vector.Half,
    });
    const foods: FoodType[] = ["food2", "food3"];
    const createDish = () => {
      const randomIndex = Math.floor(Math.random() * 2);
      return ["food1" as FoodType, foods[randomIndex]];
    };

    this.ordersToDisribute = [
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
      new Order({
        dish: new Set(createDish()),
      }),
    ];

    super.onInitialize(engine);
  }
}
