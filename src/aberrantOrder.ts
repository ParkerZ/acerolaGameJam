import * as ex from "excalibur";
import { Order } from "./order";

export class AberrantOrder extends Order {
  constructor(args: {
    x?: number;
    y?: number;
    waitTimeMs?: number;
    price?: number;
  }) {
    super({ ...args, dish: new Set(["invalid"]) });
  }
}
