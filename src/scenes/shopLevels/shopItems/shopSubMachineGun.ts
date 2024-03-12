import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Handgun } from "../../../weapons/handgun";
import { SubMachineGun } from "../../../weapons/subMachineGun";
import { UIColor } from "../../../types";
import { Player } from "../../../player";

export class ShopSubMachineGun extends ShopItem {
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
      Weapon: SubMachineGun,
      sprite: new ex.Text({ text: "SMG\n15", color: ex.Color.Black }),
      cost: 15,
      color,
      player,
    });
  }
}
