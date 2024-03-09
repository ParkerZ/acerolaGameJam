import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { Handgun } from "../../../weapons/handgun";
import { SubMachineGun } from "../../../weapons/subMachineGun";

export class ShopSubMachineGun extends ShopItem {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      Weapon: SubMachineGun,
      sprite: new ex.Text({ text: "SMG\n15", color: ex.Color.Black }),
      cost: 15,
    });
  }
}
