import * as ex from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { NextLevelEvent } from "./types";

export class NextLevelButton extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { loadnextlevel: NextLevelEvent }
  >();

  constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, anchor: ex.Vector.Half });
  }

  onInitialize(engine: ex.Engine<any>): void {
    const text = new ex.ScreenElement({
      pos: this.pos,
      anchor: ex.Vector.Half,
      z: 2,
    });

    text.graphics.use(new ex.Text({ text: "Continue" }), {});
    engine.add(text);

    this.graphics.use(
      new ex.Rectangle({
        width: 50,
        height: 25,
        color: ex.Color.Green,
      })
    );

    this.on("pointerdown", () => {
      this.events.emit("loadnextlevel");
    });
  }
}
