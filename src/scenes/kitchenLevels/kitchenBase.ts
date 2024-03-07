import * as ex from "excalibur";
import { DeliveryStation } from "../../counters/deliveryStation";
import { Order } from "../../order";
import { Player } from "../../player";
import { mainSpriteSheet } from "../../resources";
import { CounterBase } from "../../counters/counterBase";
import { COUNTER_WIDTH, ORDER_DELAY_MS } from "../../constants";
import { NextCombatLevelEvent, OrdersClearedEvent } from "../../types";
import { selectRandom } from "../../util";
import { AberrantOrder } from "../../aberrantOrder";
import { Wall } from "../../wall";

export class KitchenBase extends ex.Scene {
  public events = new ex.EventEmitter<
    ex.SceneEvents & {
      orderscleared: OrdersClearedEvent;
      loadnextcombatlevel: NextCombatLevelEvent;
    }
  >();

  private currentOrders: Order[] = [];
  private player: Player;
  private isOrderingClosed: boolean = false;

  protected ordersToDisribute: Order[] = [];
  protected counters: CounterBase[] = [];
  protected deliveryStation: DeliveryStation;

  constructor({ player }: { player: Player }) {
    super();
    this.player = player;
    this.deliveryStation = new DeliveryStation({ x: 0, y: 0 });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.player.setIsEnabled(engine, true);

    for (let x = 0; x < 13; x++) {
      for (let y = 0; y < 13; y++) {
        const tileSprite = mainSpriteSheet
          .getSprite(10, 0)
          ?.clone() as ex.Sprite;

        const floorTile = new ex.ScreenElement({
          x: -32,
          y: -32,
          z: -2,
        });

        tileSprite.rotation = selectRandom([Math.PI / 2, (Math.PI * 3) / 2]);

        floorTile.graphics.show(tileSprite, {
          offset: ex.vec(x * 64, y * 64),
        });

        engine.add(floorTile);
      }
    }

    this.addWalls(engine);

    this.player.setPos(ex.vec(engine.halfDrawWidth, engine.halfDrawHeight));
    engine.add(this.player);

    this.counters.forEach((counter) => {
      engine.add(counter);
    });

    this.deliveryStation.setPos(
      ex.vec(
        engine.halfDrawWidth + COUNTER_WIDTH * 0,
        engine.halfDrawHeight - COUNTER_WIDTH * 3
      )
    );
    engine.add(this.deliveryStation);

    const orders = [
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

    setTimeout(() => {
      this.distributeOrders(engine);
    }, ORDER_DELAY_MS / 2);

    this.deliveryStation.events.on("deliveryevent", (event) => {
      const orderToClear = this.currentOrders.findIndex((o) => {
        const orderIngredients = o.getDishIngredients();

        // check set equivalence
        return (
          orderIngredients.size === event.dishIngredients.size &&
          Array.from(orderIngredients).every((ingredient) =>
            event.dishIngredients.has(ingredient)
          )
        );
      });

      if (orderToClear === -1) {
        return;
      }

      this.player.addCoins(this.currentOrders[orderToClear].getPrice());
      this.currentOrders[orderToClear].setIsComplete(true);
      this.currentOrders[orderToClear].kill();
      engine.remove(this.currentOrders[orderToClear]);
      this.currentOrders.splice(orderToClear, 1);
      this.currentOrders.forEach((order, i) => order.setPosByIndex(i));

      if (this.isOrderingClosed && this.currentOrders.length === 0) {
        this.events.emit("orderscleared");
      }
    });
  }

  private addWalls(engine: ex.Engine<any>) {
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
  }

  private distributeOrders(engine: ex.Engine<any>) {
    const nextOrder = this.ordersToDisribute[0];
    nextOrder.setPosByIndex(this.currentOrders.length);
    this.currentOrders.push(nextOrder);
    engine.add(nextOrder);

    nextOrder.events.on("orderexpired", (event) => {
      if (!this.isCurrentScene()) {
        return;
      }
      const orderToClear = this.currentOrders.findIndex(
        (order) => order === nextOrder
      );

      if (orderToClear === -1) {
        return;
      }

      nextOrder.kill();
      engine.remove(nextOrder);
      this.currentOrders.splice(orderToClear, 1);
      this.currentOrders.forEach((order, i) => order.setPosByIndex(i));

      if (nextOrder instanceof AberrantOrder) {
        this.player.setIsEnabled(engine, false);
        this.events.emit("loadnextcombatlevel");
      } else {
        this.player.loseHealth(nextOrder.getDamage());

        if (this.isOrderingClosed && this.currentOrders.length === 0) {
          this.player.setIsEnabled(engine, false);
          this.events.emit("orderscleared");
        }
      }
    });

    this.ordersToDisribute.splice(0, 1);

    if (!this.ordersToDisribute.length) {
      this.isOrderingClosed = true;
      return;
    }

    setTimeout(() => {
      this.distributeOrders(engine);
    }, ORDER_DELAY_MS);
  }

  onDeactivate(context: ex.SceneActivationContext<undefined>): void {
    this.currentOrders.forEach((order) => {
      order.kill();
      context.engine.remove(order);
    });

    this.ordersToDisribute.forEach((order) => {
      order.kill();
      context.engine.remove(order);
    });

    this.counters.forEach((counter) => {
      counter.kill();
      context.engine.remove(counter);
    });

    this.deliveryStation.kill();
    context.engine.remove(this.deliveryStation);
  }
}
