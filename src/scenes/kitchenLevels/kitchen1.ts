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
import { Wall } from "../../wall";
import { FoodType } from "../../types";

export class Kitchen1 extends KitchenBase {
  constructor({ player }: { player: Player }) {
    super({ player });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.counters = [
      new PlateRack({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        Food: Food1,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
        Food: Food2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        Food: Food3,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
      }),
      new Trash({
        x: engine.halfCanvasWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
      }),
    ];

    const walls = [
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "cornerNW",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "cornerNE",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "cornerSW",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "cornerSE",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        type: "vertical",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 0,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 0,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
      new Wall({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
        type: "horizontal",
      }),
    ];

    walls.forEach((wall) => engine.add(wall));

    this.deliveryStation.setPos(
      ex.vec(
        engine.halfDrawWidth + COUNTER_WIDTH * 0,
        engine.halfDrawHeight - COUNTER_WIDTH * 3
      )
    );

    const foods: FoodType[] = ["food1", "food2", "food3"];
    const createDish = () => {
      const randomIndex = Math.floor(Math.random() * 3);
      return foods.filter((_item, i) => i !== randomIndex);
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
    ];

    super.onInitialize(engine);
  }
}
