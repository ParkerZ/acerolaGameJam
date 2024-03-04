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

export class Kitchen1 extends KitchenBase {
  constructor({ player }: { player: Player }) {
    super({ player });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.counters = [
      new PlateRack({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 0,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
      }),
      new Trash({
        x: engine.halfCanvasWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
        Food: Food1,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 0,
        Food: Food2,
      }),
      new Crate({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
        Food: Food3,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 3,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 1,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
      }),
      new Counter({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 3,
      }),
    ];

    this.deliveryStation.setPos(
      ex.vec(
        engine.halfDrawWidth + COUNTER_WIDTH * 0,
        engine.halfDrawHeight - COUNTER_WIDTH * 3
      )
    );

    this.ordersToDisribute = [
      new Order({
        x: 10,
        y: 10,
        dish: new Set(["food1", "food2"]),
      }),
      new Order({
        x: 10,
        y: 10,
        dish: new Set(["food1", "food3"]),
      }),
      new Order({
        x: 10,
        y: 10,
        dish: new Set(["food2", "food3"]),
      }),
      new Order({
        x: 10,
        y: 10,
        dish: new Set(["food1", "food3"]),
      }),
      new Order({
        x: 10,
        y: 10,
        dish: new Set(["food1", "food2"]),
      }),
    ];

    super.onInitialize(engine);
  }
}
