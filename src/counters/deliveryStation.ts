import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { CounterBase } from "./counterBase";
import { HoldableItem } from "../items/holdableItem";
import { Plate } from "../items/plate";
import { ActorEvents } from "excalibur/build/dist/Actor";

export class DeliveryStation extends CounterBase {
  public events = new ex.EventEmitter<ActorEvents & { newEvent: Event }>();
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      sprite: mainSpriteSheet.getSprite(4, 19)?.clone() as ex.Sprite,
    });
  }

  public onTake() {
    return undefined;
  }

  public onGive(item: HoldableItem) {
    this.events.emit("newEvent", {
      data: "stuff",
    });

    if (item instanceof Plate) {
      console.log(item.getContents());
      item.kill();
      return true;
    }
    return false;
  }
}
