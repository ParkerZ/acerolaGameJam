import { Enemy1 } from "./enemies/enemy1";
import { ShopHandgun } from "./scenes/shopLevels/shopItems/shopHandgun";
import { ShopShotgun } from "./scenes/shopLevels/shopItems/shopShotgun";
import { ShopSniper } from "./scenes/shopLevels/shopItems/shopSniper";
import { Handgun } from "./weapons/handgun";
import { Knife } from "./weapons/knife";
import { Shotgun } from "./weapons/shotgun";
import { Sniper } from "./weapons/sniper";

export type FoodType = "food1" | "food2" | "food3";
export type WeaponType =
  | typeof Handgun
  | typeof Knife
  | typeof Shotgun
  | typeof Sniper;

export type ShopWeaponType =
  | typeof ShopHandgun
  | typeof ShopShotgun
  | typeof ShopSniper;

export interface DeliveryEvent extends Event {
  dishIngredients: Set<FoodType>;
}

export interface OrderExpiredEvent extends Event {}

export interface OrdersClearedEvent extends Event {}

export interface BuyWeaponEvent extends Event {
  cost: number;
  Weapon: WeaponType;
}

export interface NextLevelEvent extends Event {}

export interface EnemyDiedEvent extends Event {}

export interface EnemiesCombineEvent extends Event {
  enemiesToCombine: Enemy1[];
}
