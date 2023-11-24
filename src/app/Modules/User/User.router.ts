import express from 'express';
import { UserController } from './User.controller';

const router = express.Router();
//user api
router.post('/users', UserController.CreateNewUser);
router.get('/users', UserController.GetAllUsers);
router.get('/users/:userId', UserController.GetAUser);
router.put('/users/:userId', UserController.UpdateAUserInfo);
router.delete('/users/:userId', UserController.DeleteAUser);

//orders api
router.put('/users/:userId/orders', UserController.AddNewProductToOrder);
router.get('/users/:userId/orders', UserController.GetAllOrdersForAUser);
router.get(
  '/users/:userId/orders/total-price',
  UserController.CalculateTotalPriceOfOrderForAUser,
);

export const UserRouter = router;
