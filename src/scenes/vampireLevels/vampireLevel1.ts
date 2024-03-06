import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";

export class VampireLevel1 extends VampireLevelBase {
  constructor({ player }: { player: Player }) {
    super({ player });
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);

    const enemySpawner = new EnemySpawner({
      Enemy: Enemy1,
      target: this.player,
      spawnRateMs: 1000,
      spawnCap: 20,
    });

    engine.add(enemySpawner);
  }
}
