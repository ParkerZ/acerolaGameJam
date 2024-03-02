import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { Player } from "../player";
import { Crate } from "../counters/crate";
import { Counter } from "../counters/counter";
import { FoodBase } from "../items/foodItems/foodBase";
import { Food1 } from "../items/foodItems/food1";
import { Trash } from "../counters/trash";
import { Food2 } from "../items/foodItems/food2";
import { PlateRack } from "../counters/plateRack";
import { DeliveryStation } from "../counters/deliveryStation";

export class Kitchen extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine<any>): void {
    const tileSprite = mainSpriteSheet.getSprite(10, 0)?.clone() as ex.Sprite;

    for (let x = 0; x < 13; x++) {
      for (let y = 0; y < 13; y++) {
        const floorTile = new ex.ScreenElement({
          x: -32,
          y: -32,
          z: -1,
        });

        tileSprite.rotation += Math.PI / 2;
        floorTile.graphics.show(tileSprite, {
          offset: ex.vec(x * 64, y * 64),
        });

        engine.add(floorTile);
      }
    }

    const player = new Player({
      x: engine.halfDrawWidth,
      y: engine.halfDrawHeight,
    });
    engine.add(player);

    const crate1 = new Crate({
      x: engine.halfDrawWidth + 128,
      y: engine.halfDrawHeight,
      Food: Food1,
    });

    const trash = new Trash({
      x: engine.halfCanvasWidth + 128,
      y: engine.halfDrawHeight + 128,
    });

    const crate2 = new Crate({
      x: engine.halfDrawWidth - 128,
      y: engine.halfDrawHeight - 128,
      Food: Food1,
    });

    const counter2 = new Counter({
      x: engine.halfCanvasWidth,
      y: engine.halfDrawHeight + 128,
    });

    const crate3 = new Crate({
      x: engine.halfDrawWidth + 128,
      y: engine.halfDrawHeight - 128,
      Food: Food2,
    });

    const counter3 = new Counter({
      x: engine.halfCanvasWidth - 128,
      y: engine.halfDrawHeight,
    });

    const plateRack = new PlateRack({
      x: engine.halfDrawWidth - 128,
      y: engine.halfDrawHeight + 128,
    });

    const counter4 = new Counter({
      x: engine.halfCanvasWidth,
      y: engine.halfDrawHeight - 128,
    });

    const deliveryStation = new DeliveryStation({
      x: engine.halfCanvasWidth,
      y: engine.halfDrawHeight - 256,
    });

    engine.add(crate1);
    engine.add(trash);
    engine.add(crate2);
    engine.add(counter2);
    engine.add(crate3);
    engine.add(counter3);
    engine.add(plateRack);
    engine.add(counter4);
    engine.add(deliveryStation);

    deliveryStation.on("newEvent", (evt) => {
      // TODO: check delivery against orders here
      console.log("received delivery event", evt);
    });
  }
}
