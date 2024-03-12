import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Sniper } from "../../../weapons/sniper";
import { UIColor } from "../../../types";
import { Player } from "../../../player";

export class ShopSniper extends ShopItem {
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
      Weapon: Sniper,
      sprite: new ex.Text({ text: "sniper\n18", color: ex.Color.Black }),
      cost: 18,
      color,
      player,
    });
  }
}
