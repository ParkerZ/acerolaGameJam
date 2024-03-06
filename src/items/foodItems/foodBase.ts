import * as ex from "excalibur";
import { ProjectileBase } from "../../weapons/projectiles/projectileBase";
import { HoldableItem } from "../holdableItem";
import { FoodType } from "../../types";
import { StatusBar } from "../../statusBar";

export class FoodBase extends HoldableItem {
  protected choppedSprite?: ex.Graphic;
  protected maxHealth: number = 0;
  protected health: number = 0;
  protected foodType: FoodType = "food1";

  protected statusBar: StatusBar;
  private isStatusShowing: boolean = false;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
    });

    this.statusBar = new StatusBar({
      x: 0,
      y: 0,
      maxVal: 0,
      size: "sm",
      color: ex.Color.Green,
    });
  }

  public getHealth(): number {
    return this.health;
  }

  public getFoodType(): FoodType {
    return this.foodType;
  }

  public getSprite(): ex.Graphic | undefined {
    return this.sprite;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.isStatusShowing) {
      this.statusBar.setPos(ex.vec(this.pos.x, this.pos.y + 20));
      this.statusBar.setCurrVal(Math.max(this.health, 0));
    }

    if (this.health !== this.maxHealth && !this.isStatusShowing) {
      this.isStatusShowing = true;
      engine.add(this.statusBar);
    }

    if (this.health <= 0) {
      this.isStatusShowing = true;
      this.statusBar.kill();
      engine.remove(this.statusBar);
    }
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.health = this.maxHealth;
    this.statusBar.setMaxVal(this.maxHealth);

    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
    super.onInitialize(engine);
  }

  private collisionStart(
    engine: ex.Engine<any>,
    event: ex.CollisionStartEvent<ex.Actor>
  ): void {
    if (this.isHeld) {
      return;
    }

    if (event.other instanceof ProjectileBase) {
      this.chop(event.other.getDamage());
    }
  }

  private chop(damage: number) {
    this.health -= damage;
    if (this.health <= 0 && this.choppedSprite) {
      this.graphics.use(this.choppedSprite);
    }
  }
}
