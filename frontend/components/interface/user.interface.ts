import { OrderProps } from "./order.interface";

export interface UserProps {
    id?: string;
    email?:string;
    fullName?: string;
    password?: string;
    role?:string;
    isVerified?:boolean,
    orders?: OrderProps[],
    createdAt?: string,
}