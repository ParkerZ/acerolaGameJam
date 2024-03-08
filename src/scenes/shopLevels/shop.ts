import * as ex from "excalibur";
import { invertSpriteSheet, mainSpriteSheet } from "../../resources";
import { Player } from "../../player";
import { ShopHandgun } from "./shopItems/shopHandgun";
import { NextLevelEvent, ShopWeaponType, WeaponType } from "../../types";
import { selectRandom } from "../../util";
import { ShopShotgun } from "./shopItems/shopShotgun";
import { ShopSniper } from "./shopItems/shopSniper";
import { NextLevelButton } from "../../nextLevelButton";
import { ShopSubMachineGun } from "./shopItems/shopSubMachineGun";

export class Shop extends ex.Scene {
  public events = new ex.EventEmitter<
    ex.SceneEvents & { loadnextlevel: NextLevelEvent }
  >();

  private numWeapons: number;
  private seedWeapons: ShopWeaponType[];
  private player: Player;

  constructor({
    player,
    numWeapons = 2,
    seedWeapons = [],
  }: {
    player: Player;
    numWeapons?: number;
    seedWeapons?: ShopWeaponType[];
  }) {
    super();
    this.player = player;
    this.numWeapons = numWeapons;
    this.seedWeapons = seedWeapons;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.player.setIsEnabled(engine, false);
    this.player.healToFull();
    this.player.showCoinHud(engine);

    const weaponOptions = new Set([
      ShopHandgun,
      ShopShotgun,
      ShopSniper,
      ShopSubMachineGun,
    ]);
    this.seedWeapons.forEach((seedWeapon) => weaponOptions.delete(seedWeapon));

    for (let i = 0; i < this.numWeapons; i++) {
      const Weapon =
        this.seedWeapons[i] ?? selectRandom(Array.from(weaponOptions));

      const weaponForSale = new Weapon({
        x: engine.halfDrawWidth - 100 * ((this.numWeapons - 1) / 2) + i * 100,
        y: engine.halfDrawHeight,
      });

      engine.add(weaponForSale);
      weaponForSale.events.on("buyweapon", (event) => {
        if (this.player.getCoins() < event.cost) {
          return;
        }

        weaponForSale.kill();
        engine.remove(weaponForSale);
        this.player.loseCoins(event.cost);
        this.player.switchWeapon(event.Weapon);
      });
    }

    const nextLevelButton = new NextLevelButton({
      x: engine.halfDrawWidth,
      y: (engine.drawHeight * 3) / 4,
    });

    engine.add(nextLevelButton);

    nextLevelButton.events.on("loadnextlevel", () => {
      this.events.emit("loadnextlevel");
    });
  }
}
