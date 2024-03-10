import * as ex from "excalibur";

type Size = "sm" | "md" | "lg" | "thin";

const heightMap: Record<Size, number> = {
  sm: 8,
  md: 10,
  lg: 25,
  thin: 10,
};

const widthMap: Record<Size, number> = {
  sm: 30,
  md: 100,
  lg: 400,
  thin: 300,
};

const outlineWeightMap: Record<Size, number> = {
  sm: 1,
  md: 1,
  lg: 5,
  thin: 1,
};

class InnerBar extends ex.ScreenElement {
  protected barWidth: number;
  protected barWidthMax: number;
  protected barHeight: number;

  constructor({
    width,
    height,
    color,
    z,
  }: {
    width: number;
    height: number;
    color: ex.Color;
    z: number;
  }) {
    super({
      z,
      anchor: ex.Vector.Half,
    });
    this.barWidth = width;
    this.barWidthMax = width;
    this.barHeight = height;
    this.color = color;
  }

  public onInitialize(engine: ex.Engine<any>): void {
    this.graphics.onPostDraw = (gfx: ex.ExcaliburGraphicsContext) => {
      gfx.drawRectangle(
        ex.vec(-this.barWidthMax / 2, -this.barHeight / 2),
        this.barWidth,
        this.barHeight,
        this.color
      );
    };
  }

  public setBarWidth(val: number) {
    this.barWidth = Math.max(val, 0);
  }
}

export class StatusBar extends ex.ScreenElement {
  protected barWidth: number;
  protected barHeight: number;
  protected outlineWeight: number;
  protected maxVal: number;
  protected currVal: number;
  protected barColor: ex.Color;
  protected innerBar: InnerBar;

  constructor({
    x,
    y,
    z = 1,
    maxVal,
    size = "md",
    color = ex.Color.Red,
  }: {
    x: number;
    y: number;
    z?: number;
    maxVal: number;
    size?: Size;
    color?: ex.Color;
  }) {
    super({
      x,
      y,
      z,
      anchor: ex.Vector.Half,
    });

    this.barHeight = heightMap[size];
    this.barWidth = widthMap[size];
    this.outlineWeight = outlineWeightMap[size];
    this.maxVal = maxVal;
    this.currVal = maxVal;
    this.barColor = color;

    this.innerBar = new InnerBar({
      width: this.barWidth,
      height: this.barHeight,
      color: this.barColor,
      z,
    });
  }

  public setPos(pos: ex.Vector) {
    this.pos = pos;
    this.innerBar.pos = this.pos;
  }

  public setMaxVal(val: number) {
    this.maxVal = val;
    this.currVal = val;
  }

  public setCurrVal(val: number) {
    this.currVal = val;
    this.updateGraphics();
  }

  public registerInnerBar(engine: ex.Engine<any>) {
    engine.add(this.innerBar);
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(
      new ex.GraphicsGroup({
        members: [
          {
            graphic: new ex.Rectangle({
              height: this.barHeight + this.outlineWeight * 2,
              width: this.barWidth + this.outlineWeight * 2,
              color: ex.Color.White,
            }),
            offset: ex.Vector.Zero,
          },
          {
            graphic: new ex.Rectangle({
              height: this.barHeight - 2,
              width: this.barWidth - 2,
              color: ex.Color.LightGray,
            }),
            offset: ex.vec(this.outlineWeight + 1, this.outlineWeight + 1),
          },
        ],
      })
    );

    this.registerInnerBar(engine);
    this.updateGraphics();
  }

  private updateGraphics() {
    this.innerBar.setBarWidth(this.barWidth * (this.currVal / this.maxVal));
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    scene.engine.remove(this.innerBar);
    this.innerBar.kill();
  }
}
