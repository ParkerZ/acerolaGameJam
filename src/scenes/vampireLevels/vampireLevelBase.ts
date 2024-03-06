import * as ex from "excalibur";
import { invertSpriteSheet } from "../../resources";
import { Player } from "../../player";
import { NextLevelEvent } from "../../types";
import { PlayerCameraMount } from "../../playerCameraMount";
import { COUNTER_WIDTH } from "../../constants";
import { Wall } from "../../wall";
import { EnemyBase } from "../../enemies/enemyBase";
import { Enemy1 } from "../../enemies/enemy1";
import { EnemySpawner } from "../../enemies/enemySpawner";

export class VampireLevelBase extends ex.Scene {
  public events = new ex.EventEmitter<
    ex.SceneEvents & { loadnextlevel: NextLevelEvent }
  >();

  protected player: Player;

  constructor({ player }: { player: Player }) {
    super();
    this.player = player;
  }

  onInitialize(engine: ex.Engine<any>): void {
    const cameraMount = new PlayerCameraMount(this.player);

    this.player.setIsEnabled(true);

    const tileSprite = invertSpriteSheet.getSprite(11, 0)?.clone() as ex.Sprite;

    for (let x = 0; x < 13 * 3 - 1; x++) {
      for (let y = 0; y < 13 * 3 - 1; y++) {
        if (Math.floor(Math.random() * 4) !== 0) {
          continue;
        }

        const floorTile = new ex.Actor({
          x: 56,
          y: -42,
          anchor: ex.Vector.Half,
          z: -2,
        });

        tileSprite.rotation += Math.PI / 2;
        floorTile.graphics.show(tileSprite, {
          offset: ex.vec((x - 13) * 64, (y - 13) * 64),
        });

        engine.add(floorTile);
      }
    }

    const wallMax = COUNTER_WIDTH * (6 + 13);
    const walls = [
      new Wall({
        x: engine.halfDrawWidth - wallMax,
        y: engine.halfDrawHeight - wallMax,
        type: "cornerNW",
      }),
      new Wall({
        x: engine.halfDrawWidth + wallMax,
        y: engine.halfDrawHeight - wallMax,
        type: "cornerNE",
      }),
      new Wall({
        x: engine.halfDrawWidth - wallMax,
        y: engine.halfDrawHeight + wallMax,
        type: "cornerSW",
      }),
      new Wall({
        x: engine.halfDrawWidth + wallMax,
        y: engine.halfDrawHeight + wallMax,
        type: "cornerSE",
      }),
    ];

    for (let i = 1; i < 13 * 3 - 1; i++) {
      walls.push(
        new Wall({
          x: engine.halfDrawWidth - wallMax + i * COUNTER_WIDTH,
          y: engine.halfDrawHeight - wallMax,
          type: "horizontal",
        }),
        new Wall({
          x: engine.halfDrawWidth - wallMax + i * COUNTER_WIDTH,
          y: engine.halfDrawHeight + wallMax,
          type: "horizontal",
        }),
        new Wall({
          x: engine.halfDrawWidth - wallMax,
          y: engine.halfDrawHeight - wallMax + i * COUNTER_WIDTH,
          type: "vertical",
        }),
        new Wall({
          x: engine.halfDrawWidth + wallMax,
          y: engine.halfDrawHeight - wallMax + i * COUNTER_WIDTH,
          type: "vertical",
        })
      );
    }

    walls.forEach((wall) => engine.add(wall));

    this.player.setPos(ex.vec(engine.halfDrawWidth, engine.halfDrawHeight));
    engine.add(this.player);
    engine.add(cameraMount);

    this.camera.pos = cameraMount.pos;
    this.camera.clearAllStrategies();
    this.camera.strategy.elasticToActor(cameraMount, 0.045, 0.1);
  }
}
