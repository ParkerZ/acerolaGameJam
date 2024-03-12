import * as ex from "excalibur";
import { FoodType, OrderExpiredEvent } from "./types";
import {
  COLORS,
  FOOD_TYPE_SPRITE_MAP,
  ORDER_DAMAGE,
  ORDER_TIMEOUT_MS,
} from "./constants";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { StatusBar } from "./statusBar";
import {
  orderBgRedSprite,
  orderBgSprite,
  orderProfile1Sprite,
  orderProfile2Sprite,
  orderProfile3Sprite,
} from "./resources";
import { getElapsedTime, shuffleArray } from "./util";

export class Order extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { orderexpired: OrderExpiredEvent }
  >();

  protected dishIngredients: Set<FoodType>;
  protected waitTimeMs: number;
  protected price: number;
  protected damage: number = ORDER_DAMAGE;
  protected isComplete: boolean = false;
  protected startTime: Date;

  private statusBar: StatusBar;
  private profile: ex.ScreenElement;
  private profileStage: number = 1;
  private bgSprite: ex.Sprite = orderBgSprite;

  protected profile1Sprite = orderProfile1Sprite;
  protected profile2Sprite = orderProfile2Sprite;
  protected profile3Sprite = orderProfile3Sprite;

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
      color: COLORS.blue,
      complementaryColor: COLORS.blueLight,
    });
    this.profile = new ex.ScreenElement({
      anchor: ex.Vector.Half,
    });
    this.startTime = new Date();
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
    this.pos.y = 10 + (110 + 7) * index;
    this.statusBar.setPos(this.pos.add(ex.vec(156 / 2, 95)));
    this.profile.pos = this.pos.add(ex.vec(156 / 3, 45));
  }

  public setIsComplete(val: boolean) {
    this.isComplete = val;
  }

  private updateGraphics() {
    const members: ex.GraphicsGrouping[] = [
      { graphic: this.bgSprite, offset: ex.Vector.Zero },
    ];

    const dishArr = Array.from(this.dishIngredients);
    if (dishArr.length === 2) {
      const graphic1 = FOOD_TYPE_SPRITE_MAP[dishArr[0]].clone();
      graphic1.scale = ex.vec(0.8, 0.8);
      members.push({
        graphic: graphic1,
        offset: ex.vec(92, 0),
      });

      const graphic2 = FOOD_TYPE_SPRITE_MAP[dishArr[1]].clone();
      graphic2.scale = ex.vec(0.8, 0.8);
      members.push({
        graphic: graphic2,
        offset: ex.vec(92, 42),
      });
    } else {
      const graphic = FOOD_TYPE_SPRITE_MAP[dishArr[0]].clone();
      members.push({
        graphic,
        offset: ex.vec(86, 12),
      });
    }

    const graphic = new ex.GraphicsGroup({
      members,
    });

    this.graphics.use(graphic);
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.startTime = new Date();
    engine.add(this.statusBar);
    engine.add(this.profile);
    this.updateGraphics();
    this.profile.graphics.use(this.profile1Sprite);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.isComplete) {
      return;
    }

    const elapsedTime = getElapsedTime(this.startTime);

    if (elapsedTime >= this.waitTimeMs) {
      this.events.emit("orderexpired");
      return;
    }

    if (this.profileStage === 2 && elapsedTime >= (this.waitTimeMs * 2) / 3) {
      this.profileStage = 3;
      this.profile.graphics.use(this.profile3Sprite);
      this.bgSprite = orderBgRedSprite;
      this.statusBar.setColors(COLORS.red, COLORS.redLight);
      this.updateGraphics();
    }

    if (this.profileStage === 1 && elapsedTime >= (this.waitTimeMs * 1) / 3) {
      this.profileStage = 2;
      this.profile.graphics.use(this.profile2Sprite);
    }

    this.statusBar.setCurrVal(Math.max(this.waitTimeMs - elapsedTime, 0));
  }

  onPreKill(scene: ex.Scene<unknown>): void {
    this.statusBar.kill();
    this.profile.kill();
    scene.engine.remove(this.statusBar);
    scene.engine.remove(this.profile);
  }
}
