import * as ex from "excalibur";
import { HoldableItem } from "./holdableItem";
import { plateSprite } from "../resources";
import { FoodBase } from "./foodItems/foodBase";
import { FoodType } from "../types";

export class Plate extends HoldableItem {
  sprite = plateSprite;
  private contents: Set<FoodType> = new Set();
  private contentSprites: { graphic: ex.Graphic; type: FoodType }[] = [];

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
    this.contentSprites.forEach(({ graphic }) =>
      members.push({ graphic: graphic as ex.Sprite, offset: ex.Vector.Zero })
    );

    this.graphics.use(new ex.GraphicsGroup({ members }));
  }

  private addItem(item: HoldableItem): boolean {
    // Check that item is food and is chopped
    if (item instanceof FoodBase && item.getHealth() <= 0) {
      // Check that plate doesn't have this item already
      if (!this.contents.has(item.getFoodType())) {
        this.contents.add(item.getFoodType());
        const itemSprite = item.getChoppedSprite();
        if (itemSprite) {
          this.contentSprites.push({
            graphic: itemSprite,
            type: item.getFoodType(),
          });
          this.contentSprites = this.contentSprites.sort((foodA, foodB) => {
            if (foodA.type < foodB.type) {
              return -1;
            }
            return 1;
          });
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
