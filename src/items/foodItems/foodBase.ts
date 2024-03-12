import * as ex from "excalibur";
import { ProjectileBase } from "../../weapons/projectiles/projectileBase";
import { HoldableItem } from "../holdableItem";
import { FoodType } from "../../types";
import { StatusBar } from "../../statusBar";
import { COLORS } from "../../constants";

export class FoodBase extends HoldableItem {
  protected choppedSprite?: ex.Graphic;
  protected maxHealth: number = 0;
  protected health: number = 0;
  protected foodType: FoodType = "food1";
  protected isChopped: boolean = false;

  protected statusBar: StatusBar;
  private isStatusShowing: boolean = false;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      z: 3,
    });

    this.statusBar = new StatusBar({
      x: 0,
      y: 0,
      z: 3,
      maxVal: 0,
      size: "sm",
      color: COLORS.green,
      complementaryColor: COLORS.greenLight,
    });
  }

  public setPos(val: ex.Vector) {
    super.setPos(val);
    if (this.isStatusShowing) {
      this.statusBar.setPos(ex.vec(this.pos.x, this.pos.y + 20));
    }
  }

  public getIsChopped() {
    return this.isChopped;
  }

  public getHealth(): number {
    return this.health;
  }

  public getFoodType(): FoodType {
    return this.foodType;
  }

  public getChoppedSprite(): ex.Graphic | undefined {
    return this.choppedSprite;
  }

  public onHit(damage: number, _knockBackForce: ex.Vector) {
    this.health -= damage;
    this.statusBar.setPos(ex.vec(this.pos.x, this.pos.y + 20));
    this.statusBar.setCurrVal(Math.max(this.health, 0));

    if (this.health <= 0 && this.choppedSprite) {
      this.isChopped = true;
      this.graphics.use(this.choppedSprite);
    }
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (
      this.health > 0 &&
      this.health !== this.maxHealth &&
      !this.isStatusShowing
    ) {
      this.isStatusShowing = true;
      engine.add(this.statusBar);
    }

    if (this.health <= 0 && this.isStatusShowing) {
      this.isStatusShowing = false;
      this.statusBar.kill();
      engine.remove(this.statusBar);
    }
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.health = this.maxHealth;
    this.statusBar.setMaxVal(this.maxHealth);

    super.onInitialize(engine);
  }
}
