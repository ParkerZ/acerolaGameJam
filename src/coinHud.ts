import * as ex from "excalibur";
import {
  coinHudGreenSprite,
  coinHudPurpleSprite,
  coinSprite,
  mainSpriteSheet,
} from "./resources";
import { UIColor } from "./types";
import { NumDisplay } from "./ui/numDisplay";

export class CoinHud extends ex.ScreenElement {
  private numCoins: number = 0;
  private uiColor: UIColor;
  private numDisplay: NumDisplay;

  constructor({
    x,
    y,
    color = "purple",
  }: {
    x: number;
    y: number;
    color: UIColor;
  }) {
    super({ x, y, z: 2 });

    this.uiColor = color;
    this.numDisplay = new NumDisplay({
      x,
      y,
      z: 4,
      num: 0,
    });
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
    this.numDisplay.setPos(this.pos.add(ex.vec(28 + 18 * 3, 12)));
  }

  public setCoins(val: number) {
    this.numCoins = val;
    this.updateGraphics();
  }

  public showNumber(engine: ex.Engine<any>) {
    engine.remove(this.numDisplay);
    engine.add(this.numDisplay);
  }

  public setColor(val: UIColor) {
    this.uiColor = val;
    this.updateGraphics();
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.updateGraphics();
    this.showNumber(engine);
  }

  private updateGraphics() {
    this.graphics.use(
      this.uiColor === "green" ? coinHudGreenSprite : coinHudPurpleSprite
    );
    this.numDisplay.setNum(this.numCoins);
  }
}
