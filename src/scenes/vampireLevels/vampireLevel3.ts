import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";

export class VampireLevel3 extends VampireLevelBase {
  protected superSecretExtraSpanwer: EnemySpawner;

  constructor({ player }: { player: Player }) {
    super({
      player,
      timerMs: 50000,
      spawner: new EnemySpawner({
        Enemy: Enemy1,
        target: player,
        spawnRateMs: 1075,
        spawnCap: 15,
      }),
    });

    this.superSecretExtraSpanwer = new EnemySpawner({
      Enemy: Enemy1,
      target: this.player,
      spawnRateMs: 11025,
      spawnCap: 15,
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);

    engine.add(this.superSecretExtraSpanwer);
  }

  protected cleanupSpawner(engine: ex.Engine<any>): void {
    super.cleanupSpawner(engine);

    this.superSecretExtraSpanwer.kill();
    engine.remove(this.superSecretExtraSpanwer);
  }
}
