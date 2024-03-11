import * as ex from "excalibur";
import { coinSprite, mainSpriteSheet } from "./resources";

export class CoinHud extends ex.ScreenElement {
  private numCoins: number = 0;
  constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, z: 2 });
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public setCoins(val: number) {
    this.numCoins = val;
    this.updateGraphics();
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.updateGraphics();
  }

  private updateGraphics() {
    const bg = new ex.Rectangle({
      height: 64,
      width: 80,
      color: ex.Color.White,
    });

    const icon = coinSprite;

    const text = new ex.Text({
      text: this.numCoins.toString(),
      color: ex.Color.Black,
      font: new ex.Font({ size: 30 }),
    });

    const graphic = new ex.GraphicsGroup({
      members: [
        {
          graphic: bg,
          offset: ex.Vector.Zero,
        },
        {
          graphic: icon,
          offset: ex.vec(-5, 0),
        },
        {
          graphic: text,
          offset: ex.vec(bg.width / 2 + (this.numCoins > 9 ? -3 : 5), 19),
        },
      ],
    });

    this.graphics.use(graphic);
  }
}
