import * as ex from "excalibur";
import { WeaponBase } from "../../../weapons/weaponBase";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { BuyWeaponEvent, WeaponType } from "../../../types";

export class ShopItem extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { buyweapon: BuyWeaponEvent }
  >();

  protected Weapon: WeaponType;
  protected sprite: ex.Graphic;
  protected cost: number;

  constructor({
    x,
    y,
    Weapon,
    sprite,
    cost,
  }: {
    x: number;
    y: number;
    Weapon: WeaponType;
    sprite: ex.Graphic;
    cost: number;
  }) {
    super({ x, y, anchor: ex.Vector.Half });

    this.Weapon = Weapon;
    this.sprite = sprite;
    this.cost = cost;
  }

  onInitialize(engine: ex.Engine<any>): void {
    const bg = new ex.Rectangle({
      width: 50,
      height: 50,
      color: ex.Color.LightGray,
    });

    const text = new ex.ScreenElement({
      pos: this.pos,
      anchor: ex.Vector.Half,
      z: 2,
    });

    text.graphics.use(this.sprite, {});
    engine.add(text);

    this.graphics.use(bg);

    this.on("pointerdown", () => {
      this.events.emit("buyweapon", {
        cost: this.cost,
        Weapon: this.Weapon,
      });
    });
  }
}
