import * as ex from "excalibur";
import { FoodType } from "./types";
import {
  lettuceSprite,
  mainSpriteSheet,
  cucumberSprite,
  tomatoSprite,
  chefSprite,
} from "./resources";

export const COUNTER_WIDTH = 64;
export const ORDER_TIMEOUT_MS = 27000; // 17000
export const ORDER_DELAY_MS = 5500; // 6000; // 4600
export const ORDER_DAMAGE = 25; // 34

export const MIN_X_SPAWN = -700;
export const MAX_X_SPAWN = 1400;
export const MIN_Y_SPAWN = -800;
export const MAX_Y_SPAWN = 1300;

export const FOOD_TYPE_SPRITE_MAP: Record<FoodType, ex.Sprite> = {
  food1: lettuceSprite,
  food2: tomatoSprite,
  food3: cucumberSprite,
  invalid: chefSprite,
};

export const SCENE_FADE_OUT_TIME = 500;

export const COLORS = {
  red: ex.Color.fromHex("#9a4f50"),
  redLight: ex.Color.fromHex("#c38890"),
  blue: ex.Color.fromHex("#416aa3"),
  blueLight: ex.Color.fromHex("#7ca1c0"),
  green: ex.Color.fromHex("#6eaa78"),
  greenLight: ex.Color.fromHex("#c5ccb8"),
  gray: ex.Color.fromHex("#b8b8b4"),
  purple: ex.Color.fromHex("#433455"),
};
