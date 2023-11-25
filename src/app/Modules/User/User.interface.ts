/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TUserOrder[];
}

//static method for user Existence
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
