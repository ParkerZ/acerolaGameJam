import * as ex from "excalibur";
import { Order } from "./order";
import { ORDER_TIMEOUT_MS } from "./constants";

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
  }
}
