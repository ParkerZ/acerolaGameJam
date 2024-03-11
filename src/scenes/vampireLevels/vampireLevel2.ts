import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";
import { KitchenModal } from "../../ui/kitchenModal";
import { ShopSniper } from "../shopLevels/shopItems/shopSniper";
import { ShopSubMachineGun } from "../shopLevels/shopItems/shopSubMachineGun";

export class VampireLevel2 extends VampireLevelBase {
  constructor({ player }: { player: Player }) {
    super({
      player,
      timerMs: 50000,
      spawner: new EnemySpawner({
        Enemy: Enemy1,
        target: player,
        spawnRateMs: 750,
        spawnCap: 25,
      }),
    });
  }

  protected onLoadNextLevel(engine: ex.Engine<any>): void {
    this.cleanup(engine);

    const modal = new KitchenModal({
      numCleared: this.numEnemiesKilled,
      numCoins: this.player.getCoins() - this.initialCoins,
      player: this.player,
      color: "green",
      seedWeapons: [ShopSubMachineGun, ShopSniper],
    });
    engine.add(modal);

    modal.events.on("loadnextlevel", () => {
      this.events.emit("loadnextlevel");
    });
  }
}
