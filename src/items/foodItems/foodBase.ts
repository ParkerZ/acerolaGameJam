import * as ex from "excalibur";
import { ProjectileBase } from "../../weapons/projectiles/projectileBase";
import { HoldableItem } from "../holdableItem";

export class FoodBase extends HoldableItem {
  protected choppedSprite?: ex.Graphic;
  protected health: number = 0;
  protected foodType: string = "";

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
    });
  }

  public getHealth(): number {
    return this.health;
  }

  public getFoodType(): string {
    return this.foodType;
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);
    this.on("collisionstart", (evt) => this.collisionStart(engine, evt));
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
