import * as ex from "excalibur";
import { HoldableItem } from "./holdableItem";
import { mainSpriteSheet } from "../resources";
import { FoodBase } from "./foodItems/foodBase";

export class Plate extends HoldableItem {
  sprite = mainSpriteSheet.getSprite(24, 7)?.clone() as ex.Sprite;
  private contents: string[] = [];

  constructor({ x, y }: { x: number; y: number }) {
    super({ x, y });
  }

  public getContents(): string[] {
    return this.contents;
  }

  public onGive(item: HoldableItem): boolean {
    // Check that item is food and is chopped
    if (item instanceof FoodBase && item.getHealth() <= 0) {
      // Check that plate doesn't have this item already
      if (!this.contents.includes(item.getFoodType())) {
        this.contents.push(item.getFoodType());
        item.kill();
        return true;
      }
    }
    return false;
  }
}
