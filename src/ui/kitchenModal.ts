import * as ex from "excalibur";
import { kitchenModalSprite, vampireModalSprite } from "../resources";
import { NextLevelButton } from "./nextLevelButton";
import { NextLevelEvent, ShopWeaponType, UIColor } from "../types";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { NumDisplay } from "./numDisplay";
import { Player } from "../player";
import { ShopHandgun } from "../scenes/shopLevels/shopItems/shopHandgun";
import { ShopHeavyMachineGun } from "../scenes/shopLevels/shopItems/shopHeavyMachineGun";
import { ShopItem } from "../scenes/shopLevels/shopItems/shopItem";
import { ShopShotgun } from "../scenes/shopLevels/shopItems/shopShotgun";
import { ShopSniper } from "../scenes/shopLevels/shopItems/shopSniper";
import { ShopSubMachineGun } from "../scenes/shopLevels/shopItems/shopSubMachineGun";
import { selectRandom } from "../util";

export class KitchenModal extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { loadnextlevel: NextLevelEvent }
  >();

  private numCleared: number;
  private numCoins: number;
  private numWeapons: number;
  private seedWeapons: ShopWeaponType[];
  private player: Player;
  private modalColor: UIColor;

  constructor({
    numCleared,
    numCoins,
    player,
    color,
    numWeapons = 3,
    seedWeapons = [],
  }: {
    numCleared: number;
    numCoins: number;
    player: Player;
    color: UIColor;
    numWeapons?: number;
    seedWeapons?: ShopWeaponType[];
  }) {
    super({
      z: 3,
    });

    this.numCleared = numCleared;
    this.numCoins = numCoins;
    this.player = player;
    this.numWeapons = numWeapons;
    this.seedWeapons = seedWeapons;
    this.modalColor = color;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(
      this.modalColor === "green" ? vampireModalSprite : kitchenModalSprite
    );

    const nextLevelButton = new NextLevelButton({
      x: engine.halfDrawWidth,
      y: (engine.drawHeight * 3) / 4,
      color: this.modalColor === "green" ? "purple" : "green",
    });

    engine.add(nextLevelButton);

    engine.add(
      new NumDisplay({
        x: engine.halfDrawWidth + 128 + 18,
        y: engine.halfDrawHeight - 128,
        z: 4,
        num: this.numCleared,
      })
    );

    engine.add(
      new NumDisplay({
        x: engine.halfDrawWidth + 128 + 18,
        y: engine.halfDrawHeight - 64,
        z: 4,
        num: this.numCoins,
      })
    );

    const weaponOptions = new Set(
      [
        ShopHandgun,
        ShopShotgun,
        ShopSniper,
        ShopSubMachineGun,
        ShopHeavyMachineGun,
      ].filter((Weapon) => !(this.player.getWeapon() instanceof Weapon))
    );
    this.seedWeapons.forEach((seedWeapon) => weaponOptions.delete(seedWeapon));
    const weapons: ShopItem[] = [];

    for (let i = 0; i < this.numWeapons; i++) {
      const Weapon =
        this.seedWeapons[i] ?? selectRandom(Array.from(weaponOptions));

      weaponOptions.delete(Weapon);

      const weaponForSale = new Weapon({
        x: engine.halfDrawWidth - 100 * ((this.numWeapons - 1) / 2) + i * 100,
        y: engine.halfDrawHeight,
      });

      engine.add(weaponForSale);
      weapons.push(weaponForSale);
      weaponForSale.events.on("buyweapon", (event) => {
        weaponForSale.events.clear();
        if (this.player.getCoins() < event.cost) {
          return;
        }

        weaponForSale.kill();
        engine.remove(weaponForSale);
        this.player.loseCoins(event.cost);
        this.player.switchWeapon(event.Weapon);
      });

      this.events.on("deactivate", () => {
        this.player = new Player({ x: 0, y: 0 });
      });
    }

    nextLevelButton.events.on("loadnextlevel", () => {
      this.player.healToFull();
      this.events.emit("loadnextlevel");
    });
  }
}
