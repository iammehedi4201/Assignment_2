/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TUser,
  TUserAddress,
  TUserName,
  TUserOrder,
  UserModel,
} from './User.interface';
import config from '../../config';

//UserNameSchema which is Subschema of UserSchema

const UserNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'FirstName is required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'LastName is required'],
    },
  },
  { _id: false },
);

//UserAddressSchema which is Subschema of UserSchema

const UserAddressSchema = new Schema<TUserAddress>(
  {
    street: {
      type: String,
      trim: true,
      required: [true, 'street is required'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'city is required'],
    },
    country: {
      type: String,
      trim: true,
      required: [true, 'country is required'],
    },
  },
  { _id: false },
);

const UserOrdersSchema = new Schema<TUserOrder>(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, 'ProductName is require'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Price is require'],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, 'Quantity is require'],
    },
  },
  { _id: false },
);

//UserSchema which is Main schema
const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    trim: true,
    unique: true,
    required: [true, 'userId is required'],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required'],
  },
  fullName: {
    type: UserNameSchema,
    required: [true, 'FullName is required'],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    trim: true,
    required: [true, 'isActive is required'],
  },
  hobbies: {
    type: [String],
    trim: true,
    required: [true, 'hobbies is required'],
  },
  address: {
    type: UserAddressSchema,
    required: [true, 'Address is required'],
  },
  orders: [UserOrdersSchema],
});

//Pre Middeleware to hash the Password on save or create method
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//Pre Middeleware to hash the Password on save or create method
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as TUser;
  if (update.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_round),
    );
  }
  next();
});

//static method for user Existence
UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId: userId });
  return existingUser;
};

//User Model
export const User = model<TUser, UserModel>('User', UserSchema);
