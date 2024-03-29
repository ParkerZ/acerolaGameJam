import * as ex from "excalibur";
import { Order } from "./order";
import { ORDER_TIMEOUT_MS } from "./constants";
import { selectRandom } from "./util";
import {
  orderProfileCucumberSprite,
  orderProfileLettuceSprite,
  orderProfileTomatoSprite,
} from "./resources";

export class AberrantOrder extends Order {
  constructor(args: {
    x?: number;
    y?: number;
    waitTimeMs?: number;
    price?: number;
  }) {
    super({
      ...args,
      waitTimeMs: ORDER_TIMEOUT_MS - 4700,
      dish: new Set(["invalid"]),
    });

    const sprite = selectRandom([
      orderProfileTomatoSprite,
      orderProfileLettuceSprite,
      orderProfileCucumberSprite,
    ]);
    this.profile1Sprite = sprite;
    this.profile2Sprite = sprite;
    this.profile3Sprite = sprite;
  }
}
