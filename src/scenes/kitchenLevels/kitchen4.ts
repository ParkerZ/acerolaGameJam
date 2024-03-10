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

export class Kitchen4 extends KitchenBase {
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
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        rotation: 0,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 0,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        rotation: 0,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        rotation: 0,
      }),
      new Crate({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI,
        Food: Food1,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 0,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI,
        Food: Food2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI,
        Food: Food3,
      }),
      new Trash({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        rotation: 0,
      }),
    ];

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
      new Order({
        dish: new Set(createDish()),
      }),
      new AberrantOrder({}),
      new AberrantOrder({}),
      new AberrantOrder({}),
      new AberrantOrder({}),
    ];

    super.onInitialize(engine);
  }
}
