import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { HeavyMachineGun } from "../../../weapons/heavyMachineGun";
import { UIColor } from "../../../types";
import { Player } from "../../../player";

export class ShopHeavyMachineGun extends ShopItem {
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
      Weapon: HeavyMachineGun,
      sprite: new ex.Text({ text: "HMG\n21", color: ex.Color.Black }),
      cost: 21,
      color,
      player,
    });
  }
}
