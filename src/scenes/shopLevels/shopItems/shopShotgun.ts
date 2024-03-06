import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Shotgun } from "../../../weapons/shotgun";

export class ShopShotgun extends ShopItem {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      Weapon: Shotgun,
      sprite: new ex.Text({ text: "shotgun\n10", color: ex.Color.Black }),
      cost: 10,
    });
  }
}
