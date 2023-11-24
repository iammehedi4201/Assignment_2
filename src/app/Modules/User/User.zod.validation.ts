import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const UserAddressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const UserOrderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationWithZodSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: UserNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: UserAddressValidationSchema,
  orders: z.array(UserOrderValidationSchema).optional(),
});

export default UserValidationWithZodSchema;
