import * as ex from "excalibur";
import { DeliveryStation } from "../../counters/deliveryStation";
import { Order } from "../../order";
import { Player } from "../../player";
import { kitchenBgSprite, kitchenWallsSprite } from "../../resources";
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
  private walls: Wall[] = [];
  private floors: ex.Actor[] = [];

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
    const bg = new ex.Actor({
      x: 0,
      y: 0,
      z: -1,
      anchor: ex.Vector.Zero,
    });
    bg.graphics.use(kitchenBgSprite);
    engine.add(bg);

    const wallCollider = new ex.CompositeCollider([
      ex.Shape.Box(
        448,
        64,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth, engine.halfDrawHeight - 64 * 3)
      ),
      ex.Shape.Box(
        448,
        64,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth, engine.halfDrawHeight + 64 * 3)
      ),
      ex.Shape.Box(
        64,
        320,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth + 64 * 3, engine.halfDrawHeight)
      ),
      ex.Shape.Box(
        64,
        320,
        ex.Vector.Half,
        ex.vec(engine.halfDrawWidth - 64 * 3, engine.halfDrawHeight)
      ),
    ]);

    const walls = new ex.Actor({
      x: 0,
      y: 0,
      z: 1,
      anchor: ex.Vector.Zero,
      collider: wallCollider,
      collisionType: ex.CollisionType.Fixed,
    });

    walls.graphics.use(kitchenWallsSprite);
    engine.add(walls);

    this.events.on("deactivate", () => {
      bg.kill();
      walls.kill();
      engine.remove(bg);
      engine.remove(walls);
    });
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

    this.walls.forEach((wall) => {
      wall.kill();
      context.engine.remove(wall);
    });

    this.floors.forEach((floor) => {
      floor.kill();
      context.engine.remove(floor);
    });

    this.counters.forEach((counter) => {
      counter.kill();
      context.engine.remove(counter);
    });
  }
}
