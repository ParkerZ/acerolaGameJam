import * as ex from "excalibur";
import { HoldableItem } from "./holdableItem";
import { mainSpriteSheet } from "../resources";
import { FoodBase } from "./foodItems/foodBase";
import { FoodType } from "../types";

export class Plate extends HoldableItem {
  sprite = mainSpriteSheet.getSprite(24, 7)?.clone() as ex.Sprite;
  private contents: Set<FoodType> = new Set();
  private contentSprites: ex.Graphic[] = [];

  constructor({ x, y }: { x: number; y: number }) {
    super({ x, y });
  }

  public getContents(): Set<FoodType> {
    return this.contents;
  }

  onInitialize(engine: ex.Engine<any>): void {
    super.onInitialize(engine);
    if (this.contentSprites.length) {
      this.updateGraphics();
    }
  }

  private updateGraphics() {
    const members = [
      {
        graphic: this.sprite,
        offset: ex.Vector.Zero,
      },
    ];
    this.contentSprites.forEach((sprite) =>
      members.push({ graphic: sprite as ex.Sprite, offset: ex.Vector.Zero })
    );

    this.graphics.use(new ex.GraphicsGroup({ members }));
  }

  private addItem(item: HoldableItem): boolean {
    // Check that item is food and is chopped
    if (item instanceof FoodBase && item.getHealth() <= 0) {
      // Check that plate doesn't have this item already
      if (!this.contents.has(item.getFoodType())) {
        this.contents.add(item.getFoodType());
        const itemSprite = item.getSprite();
        if (itemSprite) {
          this.contentSprites.push(itemSprite);
          this.updateGraphics();
        }
        item.kill();
        return true;
      }
    }

    return false;
  }

  public onTake(item: HoldableItem): boolean {
    return this.addItem(item);
  }

  public onGive(item: HoldableItem): boolean {
    return this.addItem(item);
  }
}
