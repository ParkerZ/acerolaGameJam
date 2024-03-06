import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Handgun } from "../../../weapons/handgun";

export class ShopHandgun extends ShopItem {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      Weapon: Handgun,
      sprite: new ex.Text({ text: "handgun\n5", color: ex.Color.Black }),
      cost: 5,
    });
  }
}
