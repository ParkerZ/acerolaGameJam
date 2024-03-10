import * as ex from "excalibur";
import { FoodType } from "./types";
import {
  lettuceSprite,
  mainSpriteSheet,
  cucumberSprite,
  tomatoSprite,
} from "./resources";

export const COUNTER_WIDTH = 64;
export const ORDER_TIMEOUT_MS = 27000; // 17000
export const ORDER_DELAY_MS = 6000; // 4600
export const ORDER_DAMAGE = 25; // 34

export const MIN_X_SPAWN = -700;
export const MAX_X_SPAWN = 1400;
export const MIN_Y_SPAWN = -800;
export const MAX_Y_SPAWN = 1300;

export const FOOD_TYPE_SPRITE_MAP: Record<FoodType, ex.Sprite> = {
  food1: lettuceSprite,
  food2: tomatoSprite,
  food3: cucumberSprite,
  invalid: mainSpriteSheet.getSprite(25, 4)?.clone() as ex.Sprite,
};

export const SCENE_FADE_OUT_TIME = 500;
