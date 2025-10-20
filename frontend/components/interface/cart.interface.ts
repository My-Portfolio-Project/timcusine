import { DishProps } from "./dish.interface";

export interface CartProps {
    id:string,
    quantity: number,
    dish: DishProps

}