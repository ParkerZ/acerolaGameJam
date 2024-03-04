import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { CounterBase } from "./counterBase";
import { HoldableItem } from "../items/holdableItem";
import { Plate } from "../items/plate";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { DeliveryEvent } from "../types";

export class DeliveryStation extends CounterBase {
  public events = new ex.EventEmitter<
    ActorEvents & { deliveryevent: DeliveryEvent }
  >();

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      sprite: mainSpriteSheet.getSprite(4, 19)?.clone() as ex.Sprite,
    });
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public onTake() {
    return undefined;
  }

  public onGive(item: HoldableItem) {
    if (item instanceof Plate) {
      this.events.emit("deliveryevent", {
        dishIngredients: item.getContents(),
      });
      item.kill();
      return true;
    }
    return false;
  }
}
