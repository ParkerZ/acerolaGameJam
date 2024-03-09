import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { Player } from "../player";

export class CoinPickup extends ex.Actor {
  private isPickedUp: boolean = false;
  private target: Player;
  private isMagnetized: boolean = false;

  constructor({ x, y, player }: { x: number; y: number; player: Player }) {
    super({
      x,
      y,
      z: -1,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Capsule(48, 48),
    });

    this.target = player;
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(mainSpriteSheet.getSprite(19, 10)?.clone() as ex.Sprite);

    // Delay pickup listener
    engine.clock.schedule(() => {
      this.checkDistanceToPlayer(engine);
      this.on("precollision", (evt) => this.precollision(engine, evt));
    }, 500);

    engine.clock;
    engine.clock.schedule(() => {
      if (!this.isPickedUp) {
        this.isPickedUp = true;
        this.kill();
        engine.remove(this);
      }
    }, 15000);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (!this.isMagnetized) {
      return;
    }

    const speed = this.vel.size;
    this.vel = this.target.pos
      .sub(this.pos)
      .normalize()
      .scale(speed + 20);
  }

  private checkDistanceToPlayer(engine: ex.Engine<any>) {
    if (this.pos.distance(this.target.pos) < 180) {
      this.isMagnetized = true;
      return;
    }

    engine.clock.schedule(() => {
      this.checkDistanceToPlayer(engine);
    }, 500);
  }

  private precollision(
    engine: ex.Engine<any>,
    event: ex.PreCollisionEvent<ex.Actor>
  ): void {
    if (this.isPickedUp) {
      return;
    }

    if (event.other instanceof Player) {
      this.isPickedUp = true;
      event.other.addCoins(1);
      engine.remove(this);
      this.kill();
    }
  }
}
