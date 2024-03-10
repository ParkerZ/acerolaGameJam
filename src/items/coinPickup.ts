import * as ex from "excalibur";
import { mainSpriteSheet } from "../resources";
import { Player } from "../player";
import { getElapsedTime } from "../util";

export class CoinPickup extends ex.Actor {
  private isPickedUp: boolean = false;
  private target: Player;
  private isMagnetized: boolean = false;
  private isEnabled: boolean = false;
  private lastDistanceCheck: Date;
  private checkDelayMs: number = 500;

  constructor({ x, y, player }: { x: number; y: number; player: Player }) {
    super({
      x,
      y,
      z: -1,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Capsule(48, 48),
    });

    this.target = player;
    this.lastDistanceCheck = new Date();
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(mainSpriteSheet.getSprite(19, 10)?.clone() as ex.Sprite);

    // Delay pickup listener
    engine.clock.schedule(() => {
      this.isEnabled = true;
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
    if (this.isMagnetized) {
      const speed = this.vel.size;
      this.vel = this.target.pos
        .sub(this.pos)
        .normalize()
        .scale(speed + 20);
      return;
    }

    if (this.isEnabled) {
      // const elapsedTime = getElapsedTime(this.lastDistanceCheck);

      // if (elapsedTime < this.checkDelayMs) {
      //   return;
      // }

      if (this.pos.distance(this.target.pos) < 180) {
        this.isMagnetized = true;
        return;
      }
    }
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
