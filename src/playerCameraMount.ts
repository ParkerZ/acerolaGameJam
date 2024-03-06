import * as ex from "excalibur";
import { Player } from "./player";

export class PlayerCameraMount extends ex.Actor {
  private player;

  constructor(player: Player) {
    super({ pos: player.pos });

    this.player = player;
  }

  onPostUpdate(_engine: ex.Engine, _delta: number): void {
    this.pos = ex.vec(
      this.player.pos.x + this.player.vel.x / 2,
      this.player.pos.y + this.player.vel.y / 2
    );
  }
}
