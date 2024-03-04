import * as ex from "excalibur";

type Size = "sm" | "md" | "lg";

const heightMap: Record<Size, number> = {
  sm: 8,
  md: 10,
  lg: 25,
};

const widthMap: Record<Size, number> = {
  sm: 30,
  md: 100,
  lg: 400,
};

const outlineWeightMap: Record<Size, number> = {
  sm: 1,
  md: 1,
  lg: 5,
};

export class StatusBar extends ex.ScreenElement {
  protected barWidth: number;
  protected barHeight: number;
  protected outlineWeight: number;
  protected maxVal: number;
  protected currVal: number;
  protected barColor: ex.Color;

  constructor({
    x,
    y,
    maxVal,
    size = "md",
    color = ex.Color.Red,
  }: {
    x: number;
    y: number;
    maxVal: number;
    size?: Size;
    color?: ex.Color;
  }) {
    super({
      x,
      y,
      z: 3,
      anchor: ex.Vector.Half,
    });

    this.barHeight = heightMap[size];
    this.barWidth = widthMap[size];
    this.outlineWeight = outlineWeightMap[size];
    this.maxVal = maxVal;
    this.currVal = maxVal;
    this.barColor = color;
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
  }

  public setMaxVal(val: number) {
    this.maxVal = val;
    this.currVal = val;
  }

  public setCurrVal(val: number) {
    this.currVal = val;
    this.updateGraphics();
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.updateGraphics();
  }

  private updateGraphics() {
    const outline = new ex.Rectangle({
      height: this.barHeight + this.outlineWeight * 2,
      width: this.barWidth + this.outlineWeight * 2,
      color: ex.Color.White,
    });

    const bg = new ex.Rectangle({
      height: this.barHeight - 2,
      width: this.barWidth - 2,
      color: ex.Color.LightGray,
    });

    const bar = new ex.Rectangle({
      height: this.barHeight,
      width: this.barWidth * (this.currVal / this.maxVal),
      color: this.barColor,
    });

    this.graphics.use(
      new ex.GraphicsGroup({
        members: [
          {
            graphic: outline,
            offset: ex.Vector.Zero,
          },
          {
            graphic: bg,
            offset: ex.vec(this.outlineWeight + 1, this.outlineWeight + 1),
          },
          {
            graphic: bar,
            offset: ex.vec(this.outlineWeight, this.outlineWeight),
          },
        ],
      })
    );
  }
}
