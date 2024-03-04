export type FoodType = "food1" | "food2" | "food3";

export interface DeliveryEvent extends Event {
  dishIngredients: Set<FoodType>;
}

export interface OrderExpiredEvent extends Event {}
