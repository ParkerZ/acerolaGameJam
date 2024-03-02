import * as ex from "excalibur";

export class HoldableItem extends ex.Actor {
  protected sprite?: ex.Graphic;
  protected isHeld: boolean = false;

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      z: 2,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Capsule(30, 30),
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    if (this.sprite) {
      this.graphics.use(this.sprite);
    }
  }

  public getSprite(): ex.Graphic | undefined {
    return this.sprite;
  }

  public setPos(pos: ex.Vector): void {
    this.pos = pos;
  }

  public setIsHeld(val: boolean): void {
    this.isHeld = val;
  }
}
