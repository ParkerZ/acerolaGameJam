import * as ex from "excalibur";
import { WeaponBase } from "../../../weapons/weaponBase";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { BuyWeaponEvent, UIColor, WeaponType } from "../../../types";
import {
  shopButtonGreenSprite,
  shopButtonPurpleSprite,
  shopButtonPressedGreenSprite,
  shopButtonPressedPurpleSprite,
  shopButtonOutlineSprite,
  coinSprite,
  pistolGreenSprite,
  shotgunGreenSprite,
  akGreenSprite,
  smgGreenSprite,
  sniperGreenSprite,
  akPurpleSprite,
  pistolPurpleSprite,
  shotgunPurpleSprite,
  smgPurpleSprite,
  sniperPurpleSprite,
} from "../../../resources";
import { NumDisplay } from "../../../ui/numDisplay";
import { Handgun } from "../../../weapons/handgun";
import { Shotgun } from "../../../weapons/shotgun";
import { HeavyMachineGun } from "../../../weapons/heavyMachineGun";
import { SubMachineGun } from "../../../weapons/subMachineGun";
import { Sniper } from "../../../weapons/sniper";
import { Player } from "../../../player";

export class ShopItem extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { buyweapon: BuyWeaponEvent }
  >();

  protected Weapon: WeaponType;
  protected sprite: ex.Graphic;
  protected cost: number;
  private isPressed: boolean = false;
  private uiColor: UIColor;
  private player;

  constructor({
    x,
    y,
    Weapon,
    sprite,
    cost,
    color = "green",
    player,
  }: {
    x: number;
    y: number;
    Weapon: WeaponType;
    sprite: ex.Graphic;
    cost: number;
    color?: UIColor;
    player: Player;
  }) {
    super({ x, y, z: 4, anchor: ex.Vector.Half });

    this.Weapon = Weapon;
    this.sprite = sprite;
    this.cost = cost;
    this.uiColor = color;
    this.player = player;
  }

  onInitialize(engine: ex.Engine<any>): void {
    const background = new ex.ScreenElement({
      pos: this.pos,
      z: 3,
      anchor: ex.Vector.Half,
    });
    engine.add(background);

    const weapon = new ex.ScreenElement({
      pos: this.pos.sub(ex.vec(0, 20)),
      z: 4,
      anchor: ex.Vector.Half,
    });

    weapon.graphics.use(this.getWeaponSprite());

    engine.add(weapon);

    const coin = new ex.ScreenElement({
      pos: this.pos.sub(ex.vec(20, -26)),
      z: 4,
      anchor: ex.Vector.Half,
    });

    coin.graphics.use(coinSprite);
    engine.add(coin);

    const numDisplay = new NumDisplay({
      x: this.pos.x + 17,
      y: this.pos.y + 10,
      z: 4,
      num: this.cost,
    });

    engine.add(numDisplay);

    this.graphics.use(
      this.uiColor === "green" ? shopButtonGreenSprite : shopButtonPurpleSprite
    );

    this.on("pointerdown", () => {
      this.isPressed = true;
      if (this.player.getCoins() < this.cost) {
        return;
      }

      this.graphics.use(
        this.uiColor === "green"
          ? shopButtonPressedGreenSprite
          : shopButtonPressedPurpleSprite
      );

      setTimeout(() => {
        this.events.emit("buyweapon", {
          cost: this.cost,
          Weapon: this.Weapon,
        });

        background.kill();
        weapon.kill();
        coin.kill();
        numDisplay.kill();
        engine.remove(background);
        engine.remove(weapon);
        engine.remove(coin);
        engine.remove(numDisplay);
        this.kill();
        engine.remove(this);
      }, 200);
    });

    this.on("pointerenter", () => {
      background.graphics.use(shopButtonOutlineSprite);
    });

    this.on("pointerleave", () => {
      if (this.isPressed) {
        this.isPressed = false;
        return;
      }

      background.graphics.hide();
    });
  }

  private getWeaponSprite() {
    if (this.uiColor === "green") {
      switch (this.Weapon) {
        case HeavyMachineGun:
          return akPurpleSprite;
        case Handgun:
          return pistolPurpleSprite;
        case Shotgun:
          return shotgunPurpleSprite;
        case SubMachineGun:
          return smgPurpleSprite;
        case Sniper:
        default:
          return sniperPurpleSprite;
      }
    }

    switch (this.Weapon) {
      case HeavyMachineGun:
        return akGreenSprite;
      case Handgun:
        return pistolGreenSprite;
      case Shotgun:
        return shotgunGreenSprite;
      case SubMachineGun:
        return smgGreenSprite;
      case Sniper:
      default:
        return sniperGreenSprite;
    }
  }
}
