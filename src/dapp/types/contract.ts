import { Item, items } from "./crafting";
import { FruitItem, FRUITS, Fruit } from "./fruits";

export { Fruit };

export enum Charity {
  TheWaterProject = "0x4a78D46dCf77ccF6D8493bD5D2c1Fe6F172CF9B3",
  Heifer = "0x4a78D46dCf77ccF6D8493bD5D2c1Fe6F172CF9B3",
  CoolEarth = "0x4a78D46dCf77ccF6D8493bD5D2c1Fe6F172CF9B3",
}

export interface Donation {
  charity: Charity;
  value: string;
}
export interface Square {
  fruit: Fruit;
  createdAt: number;
}

export interface Transaction {
  fruit: Fruit;
  createdAt: number;
  action: Action;
  landIndex: number;
}

export enum Action {
  Plant = 0,
  Harvest = 1,
}

export type ActionableItem = FruitItem | Item;

export function isFruit(item: ActionableItem): item is FruitItem {
  return !(item as Item).address;
}

export const ACTIONABLE_ITEMS = [...FRUITS, ...items];
