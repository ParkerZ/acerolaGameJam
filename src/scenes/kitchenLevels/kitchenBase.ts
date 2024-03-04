import * as ex from "excalibur";
import { DeliveryStation } from "../../counters/deliveryStation";
import { Order } from "../../order";
import { Player } from "../../player";
import { mainSpriteSheet } from "../../resources";
import { CounterBase } from "../../counters/counterBase";
import { ORDER_DELAY_MS } from "../../constants";

export class KitchenBase extends ex.Scene {
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
    const tileSprite = mainSpriteSheet.getSprite(10, 0)?.clone() as ex.Sprite;
    // const tileSprite = invertSpriteSheet.getSprite(11, 0)?.clone() as ex.Sprite;

    for (let x = 0; x < 13; x++) {
      for (let y = 0; y < 13; y++) {
        // if (Math.floor(Math.random() * 4) !== 0) {
        //   continue;
        // }

        const floorTile = new ex.ScreenElement({
          x: -32,
          y: -32,
          z: -2,
        });

        tileSprite.rotation += Math.PI / 2;
        floorTile.graphics.show(tileSprite, {
          offset: ex.vec(x * 64, y * 64),
        });

        engine.add(floorTile);
      }
    }

    this.player.setPos(ex.vec(engine.halfDrawWidth, engine.halfDrawHeight));
    engine.add(this.player);

    this.counters.forEach((counter) => {
      engine.add(counter);
    });
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

    this.distributeOrders(engine);

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
        console.log("ALL CLEAR!");
      }
    });
  }

  private distributeOrders(engine: ex.Engine<any>) {
    const nextOrder = this.ordersToDisribute[0];
    nextOrder.setPosByIndex(this.currentOrders.length);
    this.currentOrders.push(nextOrder);
    engine.add(nextOrder);

    nextOrder.events.on("orderexpired", (event) => {
      console.log("EXPIRED!");
      const orderToClear = this.currentOrders.findIndex(
        (order) => order === nextOrder
      );

      if (orderToClear === -1) {
        return;
      }

      this.player.loseHealth(this.currentOrders[orderToClear].getDamage());
      this.currentOrders[orderToClear].kill();
      engine.remove(this.currentOrders[orderToClear]);
      this.currentOrders.splice(orderToClear, 1);
      this.currentOrders.forEach((order, i) => order.setPosByIndex(i));
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
}
