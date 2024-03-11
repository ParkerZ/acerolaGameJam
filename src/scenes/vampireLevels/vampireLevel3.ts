import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";
import { KitchenModal } from "../../ui/kitchenModal";
import { ShopHeavyMachineGun } from "../shopLevels/shopItems/shopHeavyMachineGun";
import { ShopSniper } from "../shopLevels/shopItems/shopSniper";
import { ShopSubMachineGun } from "../shopLevels/shopItems/shopSubMachineGun";

export class VampireLevel3 extends VampireLevelBase {
  protected superSecretExtraSpanwer: EnemySpawner;

  constructor({ player }: { player: Player }) {
    super({
      player,
      timerMs: 50000,
      spawner: new EnemySpawner({
        Enemy: Enemy1,
        target: player,
        spawnRateMs: 1100,
        spawnCap: 15,
      }),
    });

    this.superSecretExtraSpanwer = new EnemySpawner({
      Enemy: Enemy1,
      target: this.player,
      spawnRateMs: 1100,
      spawnCap: 15,
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);

    engine.clock.schedule(() => {
      engine.add(this.superSecretExtraSpanwer);
    }, 550);

    this.superSecretExtraSpanwer.events.on("enemydied", () => {
      this.numEnemiesKilled++;
    });
  }

  protected cleanupSpawner(engine: ex.Engine<any>): void {
    super.cleanupSpawner(engine);

    this.superSecretExtraSpanwer.kill();
    engine.remove(this.superSecretExtraSpanwer);
  }

  protected onLoadNextLevel(engine: ex.Engine<any>): void {
    this.cleanup(engine);

    const modal = new KitchenModal({
      numCleared: this.numEnemiesKilled,
      numCoins: this.player.getCoins() - this.initialCoins,
      player: this.player,
      color: "green",
      seedWeapons: [ShopHeavyMachineGun, ShopSubMachineGun, ShopSniper],
    });
    engine.add(modal);

    modal.events.on("loadnextlevel", () => {
      this.events.emit("loadnextlevel");
    });
  }
}
