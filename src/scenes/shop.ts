import * as ex from "excalibur";
import { invertSpriteSheet } from "../resources";
import { Player } from "../player";

export class Shop extends ex.Scene {
  private player: Player;

  constructor({ player }: { player: Player }) {
    super();
    this.player = player;
  }

  onInitialize(engine: ex.Engine<any>): void {
    const tileSprite = invertSpriteSheet.getSprite(11, 0)?.clone() as ex.Sprite;

    for (let x = 0; x < 13; x++) {
      for (let y = 0; y < 13; y++) {
        if (Math.floor(Math.random() * 4) !== 0) {
          continue;
        }

        const floorTile = new ex.ScreenElement({
          x: -32,
          y: -32,
          z: -2,
        });

        tileSprite.rotation += Math.PI / 2;
        floorTile.graphics.show(tileSprite, {
          offset: ex.vec(x * 64, y * 64),
        });

        engine.add(floorTile);
      }
    }
  }
}
