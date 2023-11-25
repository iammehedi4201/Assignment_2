import { Request, Response } from 'express';
import { UserService } from './User.service';
import { User } from './User.model';
import {
  UserValidationWithZodSchema,
  updatedInfoValidation,
} from './User.zod.validation';
import { TUser } from './User.interface';

//Create new user
const CreateNewUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodParseData = UserValidationWithZodSchema.parse(user);
    const result = await UserService.CreateNewUserToDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to create user !',
      error: error,
    });
  }
};

//Get all user
const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.GetAllUsersFormDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to get all user!',
      error: error,
    });
  }
};

//Get a user
const GetAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const result = await UserService.GetAUserFormDB(userId);
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to get a specific user !',
      error: error,
    });
  }
};

//Update a userInfo
const UpdateAUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { UpdateAUserInfo } = req.body;
    if (await User.isUserExists(userId)) {
      const zodParseData = updatedInfoValidation.parse(
        UpdateAUserInfo,
      ) as TUser;
      const result = await UserService.UpdateAUserInfoToDB(
        userId,
        zodParseData,
      );
      res.status(200).json({
        success: true,
        message: 'User updated successfully!!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to update user info !',
      error: error,
    });
  }
};

//Delete A User
const DeleteAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      await UserService.DeleteAUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to delete a user !',
      error: error,
    });
  }
};

//Add New product to order
const AddNewProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orderInfo = req.body;
    if (await User.isUserExists(userId)) {
      await UserService.AddNewPrdouctToOrderToDB(userId, orderInfo);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error as Error).message || 'Failed to add new product to orders !',
      error: error,
    });
  }
};

//Retrieve all orders for a specific user
const GetAllOrdersForAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const result = await UserService.GetAllOrdersForAUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error as Error).message ||
        'Failed to get all orders of a specific user  !',
      error: error,
    });
  }
};

//Calculate Total Price of Orders for a Specific User
const CalculateTotalPriceOfOrderForAUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const result =
        await UserService.CalculateTotalPriceOfOrderForAUserToDB(userId);
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to calclulate total price !',
      error: error,
    });
  }
};

export const UserController = {
  CreateNewUser,
  GetAllUsers,
  GetAUser,
  UpdateAUserInfo,
  DeleteAUser,
  AddNewProductToOrder,
  GetAllOrdersForAUser,
  CalculateTotalPriceOfOrderForAUser,
};
