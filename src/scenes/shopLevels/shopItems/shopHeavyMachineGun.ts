import * as ex from "excalibur";
import { ShopItem } from "./shopItem";
import { HeavyMachineGun } from "../../../weapons/heavyMachineGun";

export class ShopHeavyMachineGun extends ShopItem {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      Weapon: HeavyMachineGun,
      sprite: new ex.Text({ text: "HMG\n20", color: ex.Color.Black }),
      cost: 20,
    });
  }
}
