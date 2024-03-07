import * as ex from "excalibur";
import { VampireLevelBase } from "./vampireLevelBase";
import { Player } from "../../player";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";

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
}
