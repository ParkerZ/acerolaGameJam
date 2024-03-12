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
import { KitchenModal } from "../../ui/kitchenModal";
import { ShopHandgun } from "../shopLevels/shopItems/shopHandgun";
import { ShopHeavyMachineGun } from "../shopLevels/shopItems/shopHeavyMachineGun";
import { ShopSubMachineGun } from "../shopLevels/shopItems/shopSubMachineGun";

export class Kitchen1 extends KitchenBase {
  private initialCoins: number = 0;

  constructor({ player }: { player: Player }) {
    super({ player });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.initialCoins = this.player.getCoins();

    this.counters = [
      new PlateRack({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 1,
        rotation: (Math.PI * 3) / 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: (Math.PI * 3) / 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 0,
        rotation: (Math.PI * 3) / 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 1,
        rotation: (Math.PI * 3) / 2,
      }),
      new Counter({
        x: engine.halfDrawWidth - COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight - COUNTER_WIDTH * 2,
        rotation: (Math.PI * 3) / 2,
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
        rotation: Math.PI / 2,
      }),
      new Trash({
        x: engine.halfDrawWidth + COUNTER_WIDTH * 2,
        y: engine.halfDrawHeight + COUNTER_WIDTH * 2,
        rotation: Math.PI / 2,
      }),
    ];

    this.counterCollider = new ex.Actor({
      collider: new ex.CompositeCollider([
        ex.Shape.Box(
          64,
          64 * 5,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth - COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight - COUNTER_WIDTH * 2 - 32
          )
        ),
        ex.Shape.Box(
          64,
          64 * 5,
          ex.Vector.Zero,
          ex.vec(
            engine.halfDrawWidth + COUNTER_WIDTH * 2 - 32,
            engine.halfDrawHeight - COUNTER_WIDTH * 2 - 32
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
    ];

    super.onInitialize(engine);
  }

  onOrdersCleared(engine: ex.Engine<any>) {
    this.cleanup(engine);

    const modal = new KitchenModal({
      numCleared: this.numOrdersCleared,
      numCoins: this.player.getCoins() - this.initialCoins,
      player: this.player,
      color: "purple",
      seedWeapons: [ShopHeavyMachineGun, ShopHandgun],
    });
    engine.add(modal);

    modal.events.on("loadnextlevel", () => {
      this.events.emit("orderscleared");
    });
  }
}
