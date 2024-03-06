import * as ex from "excalibur";
import { Player } from "../player";
import { Enemy1 } from "./enemy1";

export class StickyEnemy1 extends Enemy1 {
  private friends: Set<Enemy1> = new Set();
  private comboCount: number = 0;
  constructor({
    x,
    y,
    target,
    speedModifier,
  }: {
    x: number;
    y: number;
    target: Player;
    speedModifier: number;
  }) {
    super({
      x,
      y,
      target,
      speedModifier,
    });
  }

  onInitialize(engine: ex.Engine<any>) {
    super.onInitialize(engine);

    this.on("precollision", (evt) => this.preCollision(engine, evt));
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.friends.size > 1) {
      this.comboCount++;
    } else {
      this.comboCount = 0;
    }

    if (this.comboCount === 2) {
      this.events.emit("combineenemies", {
        enemiesToCombine: Array.from(this.friends),
      });
    }

    this.friends.clear();
  }

  private preCollision(engine: ex.Engine<any>, evt: ex.PreCollisionEvent) {
    if (evt.other instanceof Enemy1 && !(evt.other instanceof StickyEnemy1)) {
      this.friends.add(evt.other);
    }
  }
}
