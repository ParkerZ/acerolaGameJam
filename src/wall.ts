import * as ex from "excalibur";
import { mainSpriteSheet } from "./resources";

export type WallType =
  | "cornerNW"
  | "cornerNE"
  | "cornerSE"
  | "cornerSW"
  | "vertical"
  | "horizontal";

export class Wall extends ex.Actor {
  private sprite: ex.Graphic;

  constructor({ x, y, type }: { x: number; y: number; type: WallType }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Fixed,
      collider: ex.Shape.Box(63, 58, ex.Vector.Half, ex.vec(0, 1)),
    });

    switch (type) {
      case "cornerNW":
        this.sprite = mainSpriteSheet.getSprite(9, 4)?.clone() as ex.Sprite;
        break;
      case "cornerNE":
        this.sprite = mainSpriteSheet.getSprite(10, 4)?.clone() as ex.Sprite;
        break;
      case "cornerSE":
        this.sprite = mainSpriteSheet.getSprite(10, 5)?.clone() as ex.Sprite;
        break;
      case "cornerSW":
        this.sprite = mainSpriteSheet.getSprite(9, 5)?.clone() as ex.Sprite;
        break;
      case "vertical":
        this.sprite = mainSpriteSheet.getSprite(11, 5)?.clone() as ex.Sprite;
        break;
      case "horizontal":
        this.sprite = mainSpriteSheet.getSprite(11, 4)?.clone() as ex.Sprite;
        break;
    }
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(this.sprite);
  }
}
