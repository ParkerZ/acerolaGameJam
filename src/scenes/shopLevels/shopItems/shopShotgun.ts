import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Shotgun } from "../../../weapons/shotgun";
import { UIColor } from "../../../types";
import { Player } from "../../../player";

export class ShopShotgun extends ShopItem {
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
      Weapon: Shotgun,
      sprite: new ex.Text({ text: "shotgun\n10", color: ex.Color.Black }),
      cost: 10,
      color,
      player,
    });
  }
}
