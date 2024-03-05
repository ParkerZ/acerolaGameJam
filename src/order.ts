import * as ex from "excalibur";
import { FoodType, OrderExpiredEvent } from "./types";
import { ORDER_DAMAGE, ORDER_TIMEOUT_MS } from "./constants";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { StatusBar } from "./statusBar";

export class Order extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { orderexpired: OrderExpiredEvent }
  >();

  protected dishIngredients: Set<FoodType>;
  protected waitTimeMs: number;
  protected price: number;
  protected damage: number = ORDER_DAMAGE;
  protected isComplete: boolean = false;

  private statusBar: StatusBar;

  constructor({
    x = 10,
    y = 10,
    dish,
    waitTimeMs = ORDER_TIMEOUT_MS,
    price = 1,
  }: {
    x?: number;
    y?: number;
    dish: Set<FoodType>;
    waitTimeMs?: number;
    price?: number;
  }) {
    super({ x, y });

    this.dishIngredients = dish;
    this.waitTimeMs = waitTimeMs;
    this.price = price;
    this.statusBar = new StatusBar({
      x: 0,
      y: 0,
      maxVal: this.waitTimeMs,
      color: ex.Color.ExcaliburBlue,
    });
  }

  public getDishIngredients(): Set<FoodType> {
    return this.dishIngredients;
  }

  public getPrice(): number {
    return this.price;
  }

  public getDamage(): number {
    return this.damage;
  }

  public setPosByIndex(index: number) {
    // margin + (height + margin) * index
    this.pos.y = 10 + (128 + 10) * index;
    this.statusBar.setPos(this.pos.add(ex.vec(64, 100)));
  }

  public setIsComplete(val: boolean) {
    this.isComplete = val;
  }

  private updateGraphics() {
    const box = new ex.Rectangle({
      height: 128,
      width: 128,
      color: ex.Color.White,
    });

    const text = new ex.Text({
      text: Array.from(this.dishIngredients).join(",\n"),
      color: ex.Color.Black,
      font: new ex.Font({ size: 30 }),
    });

    const graphic = new ex.GraphicsGroup({
      members: [
        {
          graphic: box,
          offset: ex.Vector.Zero,
        },
        {
          graphic: text,
          offset: ex.vec(
            (box.width - text.width) / 2,
            (box.height - text.height) / 2
          ),
        },
      ],
    });

    this.graphics.use(graphic);
  }

  onInitialize(engine: ex.Engine<any>): void {
    engine.add(this.statusBar);
    this.startCountdown();
  }

  private startCountdown() {
    if (this.isComplete) {
      return;
    }

    if (this.waitTimeMs <= 0) {
      this.events.emit("orderexpired");
      return;
    }

    this.updateGraphics();

    this.waitTimeMs -= 100;
    this.statusBar.setCurrVal(Math.max(this.waitTimeMs, 0));

    setTimeout(() => this.startCountdown(), 100);
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    this.statusBar.kill();
  }
}
