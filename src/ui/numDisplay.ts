import * as ex from "excalibur";
import {
  n0SPrite,
  n1SPrite,
  n2SPrite,
  n3SPrite,
  n4SPrite,
  n5SPrite,
  n6SPrite,
  n7SPrite,
  n8SPrite,
  n9SPrite,
} from "../resources";

export class NumDisplay extends ex.ScreenElement {
  private num: number;

  constructor({
    x,
    y,
    z = 1,
    num,
  }: {
    x: number;
    y: number;
    z?: number;
    num: number;
  }) {
    super({
      x,
      y,
      z,
    });

    this.num = num;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.updateGraphics();
  }

  private updateGraphics() {
    const numString = this.num.toString();

    const digits = new Array(numString.length).fill(true).map((_, i) => ({
      graphic: this.getSprite(
        parseInt(numString[numString.length - 1 - i], 10)
      ),
      offset: ex.Vector.Zero.sub(ex.vec(18, 0).scale(i)),
    }));

    this.graphics.use(new ex.GraphicsGroup({ members: digits }));
  }

  private getSprite(num: number): ex.Sprite {
    switch (num) {
      case 1:
        return n1SPrite;
      case 2:
        return n2SPrite;
      case 3:
        return n3SPrite;
      case 4:
        return n4SPrite;
      case 5:
        return n5SPrite;
      case 6:
        return n6SPrite;
      case 7:
        return n7SPrite;
      case 8:
        return n8SPrite;
      case 9:
        return n9SPrite;
      case 0:
      default:
        return n0SPrite;
    }
  }
}
