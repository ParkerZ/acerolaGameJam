import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Handgun } from "../../../weapons/handgun";
import { UIColor } from "../../../types";
import { Player } from "../../../player";

export class ShopHandgun extends ShopItem {
  constructor({
    x,
    y,
    color,
    player,
  }: {
    x: number;
    y: number;
    color: UIColor;
    player: Player;
  }) {
    super({
      x,
      y,
      Weapon: Handgun,
      sprite: new ex.Text({ text: "handgun\n5", color: ex.Color.Black }),
      cost: 5,
      color,
      player,
    });
  }
}
