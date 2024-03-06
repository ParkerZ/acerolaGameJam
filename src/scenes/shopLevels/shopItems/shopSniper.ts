import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Sniper } from "../../../weapons/sniper";

export class ShopSniper extends ShopItem {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      Weapon: Sniper,
      sprite: new ex.Text({ text: "sniper\n15", color: ex.Color.Black }),
      cost: 15,
    });
  }
}
