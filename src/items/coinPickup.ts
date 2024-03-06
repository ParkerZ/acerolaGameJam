import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { Player } from "../player";

export class CoinPickup extends ex.Actor {
  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Capsule(48, 48),
    });
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(mainSpriteSheet.getSprite(19, 10)?.clone() as ex.Sprite);

    // Delay pickup
    setTimeout(() => {
      this.on("precollision", (evt) => this.precollision(engine, evt));
    }, 500);
  }

  private precollision(
    engine: ex.Engine<any>,
    event: ex.PreCollisionEvent<ex.Actor>
  ): void {
    if (event.other instanceof Player) {
      event.other.addCoins(1);
      engine.remove(this);
      this.kill();
    }
  }
}
