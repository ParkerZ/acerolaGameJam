import * as ex from "excalibur";
import { DeliveryStation } from "../../counters/deliveryStation";
import { Order } from "../../order";
import { Player } from "../../player";
import { kitchenBgSprite, kitchenWallsSprite } from "../../resources";
import { CounterBase } from "../../counters/counterBase";
import { COUNTER_WIDTH, ORDER_DELAY_MS } from "../../constants";
import { NextCombatLevelEvent, OrdersClearedEvent } from "../../types";
import { getElapsedTime, selectRandom } from "../../util";
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
  protected player: Player;
  private isOrderingClosed: boolean = false;
  private walls: Wall[] = [];
  private floors: ex.Actor[] = [];
  private isEnabled: boolean = false;
  private lastOrderTime: Date;

  protected numOrdersCleared: number = 0;
  protected ordersToDisribute: Order[] = [];
  protected counters: CounterBase[] = [];
  protected deliveryStation: DeliveryStation;
  protected counterCollider?: ex.Actor;

  constructor({ player }: { player: Player }) {
    super();
    this.player = player;
    this.deliveryStation = new DeliveryStation({ x: 0, y: 0 });
    this.lastOrderTime = new Date();
  }

  onInitialize(engine: ex.Engine<any>): void {
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

    engine.clock.schedule(() => {
      this.distributeOrders(engine);
      this.lastOrderTime = new Date();
      this.isEnabled = true;
    }, ORDER_DELAY_MS / 2);

    if (this.counterCollider) {
      engine.add(this.counterCollider);
    }

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
      this.numOrdersCleared++;

      if (this.isOrderingClosed && this.currentOrders.length === 0) {
        this.onOrdersCleared(engine);
      }
    });
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (!this.isEnabled) {
      return;
    }

    if (this.ordersToDisribute.length === 0) {
      this.isEnabled = false;
      return;
    }

    const elapsedTime = getElapsedTime(this.lastOrderTime);
    if (elapsedTime >= ORDER_DELAY_MS && this.currentOrders.length < 5) {
      this.distributeOrders(engine);
      this.lastOrderTime = new Date();
    }
  }

  protected onOrdersCleared(engine: ex.Engine<any>) {
    this.events.emit("orderscleared");
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

    const walls = new Wall({
      collider: wallCollider,
    });

    walls.graphics.use(kitchenWallsSprite);
    engine.add(walls);

    this.events.on("deactivate", () => {
      engine.remove(this.player);
      this.player = new Player({ x: 0, y: 0 });
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
      nextOrder.events.clear();
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
        this.player.loseHealth(engine, nextOrder.getDamage());

        if (this.isOrderingClosed && this.currentOrders.length === 0) {
          this.player.setIsEnabled(engine, false);
          this.onOrdersCleared(engine);
        }
      }
    });

    this.ordersToDisribute.splice(0, 1);

    if (!this.ordersToDisribute.length) {
      this.isOrderingClosed = true;
      return;
    }
  }

  onDeactivate(context: ex.SceneActivationContext<undefined>): void {
    this.cleanup(context.engine);
  }

  protected cleanup(engine: ex.Engine<any>) {
    this.player.setIsEnabled(engine, false);
    this.player.removeHealth(engine);
    this.player.kill();
    engine.remove(this.player);

    this.currentOrders.forEach((order) => {
      order.events.clear();
      order.kill();
      engine.remove(order);
    });

    this.ordersToDisribute.forEach((order) => {
      order.kill();
      engine.remove(order);
    });

    this.counters.forEach((counter) => {
      counter.kill();
      engine.remove(counter);
    });

    this.deliveryStation.events.clear();
    this.deliveryStation.kill();
    engine.remove(this.deliveryStation);

    this.walls.forEach((wall) => {
      wall.kill();
      engine.remove(wall);
    });

    this.floors.forEach((floor) => {
      floor.kill();
      engine.remove(floor);
    });

    this.counters.forEach((counter) => {
      counter.kill();
      engine.remove(counter);
    });

    if (this.counterCollider) {
      this.counterCollider.kill();
      engine.remove(this.counterCollider);
    }
  }
}
