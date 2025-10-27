import { DishProps } from "./dish.interface";
import { UserProps } from "./user.interface";

export interface OrderItemProps {
  id: string;
  orderId: string;
  dishId: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  dish?: DishProps; // optional — only if you fetch dish details with the order
}

export interface OrderProps {
  id: string;
  userId: string;
  country: string;
  city: string;
  street: string;
  state: string;
  totalAmount: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED"; // match your Prisma OrderStatus enum
  payment: "PAYSTACK" | "STRIPE"; // match your PaymentMethod enum
  items: OrderItemProps[]; // related items
  createdAt: string; // or Date, depending on your API
  updatedAt: string; // or Date

  // Optional helper fields (depending on your API needs)
  user?: UserProps
}
