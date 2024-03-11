import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";
import { KitchenModal } from "../../ui/kitchenModal";
import { ShopShotgun } from "../shopLevels/shopItems/shopShotgun";
import { ShopHandgun } from "../shopLevels/shopItems/shopHandgun";

export class VampireLevel1 extends VampireLevelBase {
  constructor({ player }: { player: Player }) {
    super({
      player,
      timerMs: 40000,
      spawner: new EnemySpawner({
        Enemy: Enemy1,
        target: player,
        spawnRateMs: 1000,
        spawnCap: 20,
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
      seedWeapons: [ShopHandgun, ShopShotgun],
    });
    engine.add(modal);

    modal.events.on("loadnextlevel", () => {
      this.events.emit("loadnextlevel");
    });
  }
}
