import * as ex from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { NextLevelEvent, UIColor } from "../types";
import {
  continueButtonOutlineGreenSprite,
  continueButtonOutlinePurpleSprite,
  continueButtonPressedSprite,
  continueButtonSprite,
} from "../resources";

export class NextLevelButton extends ex.ScreenElement {
  public events = new ex.EventEmitter<
    ActorEvents & { loadnextlevel: NextLevelEvent }
  >();

  private isPressed: boolean = false;
  private outlineColor: UIColor;

  constructor({
    x,
    y,
    color = "green",
  }: {
    x: number;
    y: number;
    color?: UIColor;
  }) {
    super({ x, y, z: 4, anchor: ex.Vector.Half });

    this.outlineColor = color;
  }

  onInitialize(engine: ex.Engine<any>): void {
    const background = new ex.ScreenElement({
      pos: this.pos,
      z: 3,
      anchor: ex.Vector.Half,
    });
    engine.add(background);

    this.graphics.use(continueButtonSprite);

    this.on("pointerdown", () => {
      this.isPressed = true;
      this.graphics.use(continueButtonPressedSprite);

      setTimeout(() => {
        this.events.emit("loadnextlevel");
      }, 200);
    });

    this.on("pointerenter", () => {
      if (this.isPressed) {
        return;
      }

      background.graphics.use(
        this.outlineColor === "green"
          ? continueButtonOutlineGreenSprite
          : continueButtonOutlinePurpleSprite
      );
    });

    this.on("pointerleave", () => {
      background.graphics.hide();
    });
  }
}
