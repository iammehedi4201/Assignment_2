import { TUser, TUserOrder } from './User.interface';
import { User } from './User.model';

//Create new user
const CreateNewUserToDB = async (userData: TUser) => {
  await User.create(userData);
  const result = await User.findOne({ userId: userData.userId }).select([
    '-password',
    '-_id',
  ]);
  return result;
};

//Get all user
const GetAllUsersFormDB = async () => {
  const result = await User.find().select([
    '-_id',
    'username',
    'fullName',
    'age',
    'email',
    'address',
  ]);
  return result;
};

//get a user by userID
const GetAUserFormDB = async (userId: number) => {
  const result = await User.findOne({ userId: userId }).select([
    '-_id',
    '-password',
    '-orders',
  ]);
  return result;
};

//update a user info
const UpdateAUserInfoToDB = async (userId: number, updatedInfo: TUser) => {
  const result = User.findOneAndUpdate({ userId: userId }, updatedInfo, {
    new: true,
    runValidators: true,
  }).select(['-_id', '-password', '-orders']);
  return result;
};

//Delete a user info
const DeleteAUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId: userId });
  return result;
};

//Add new product to order
const AddNewPrdouctToOrderToDB = async (
  userId: number,
  orderInfo: TUserOrder,
) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    {
      $addToSet: {
        orders: orderInfo,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

//Retrieve all orders for a specific user
const GetAllOrdersForAUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId: userId }).select([
    '-_id',
    'orders',
  ]);
  return result;
};

//Calculate Total Price of Orders for a Specific User
const CalculateTotalPriceOfOrderForAUserToDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: {
          $reduce: {
            input: '$orders',
            initialValue: 0,
            in: {
              $add: [
                '$$value',
                { $multiply: ['$$this.price', '$$this.quantity'] },
              ],
            },
          },
        },
      },
    },
  ]);
  return result;
};

export const UserService = {
  CreateNewUserToDB,
  GetAllUsersFormDB,
  GetAUserFormDB,
  UpdateAUserInfoToDB,
  DeleteAUserFromDB,
  AddNewPrdouctToOrderToDB,
  GetAllOrdersForAUserFromDB,
  CalculateTotalPriceOfOrderForAUserToDB,
};
