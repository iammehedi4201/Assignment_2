import express from 'express';
import { UserController } from './User.controller';

const router = express.Router();
//user api
router.post('', UserController.CreateNewUser);
router.get('', UserController.GetAllUsers);
router.get('/:userId', UserController.GetAUser);
router.put('/:userId', UserController.UpdateAUserInfo);
router.delete('/:userId', UserController.DeleteAUser);

//orders api
router.put('/:userId/orders', UserController.AddNewProductToOrder);
router.get('/:userId/orders', UserController.GetAllOrdersForAUser);
router.get(
  '/:userId/orders/total-price',
  UserController.CalculateTotalPriceOfOrderForAUser,
);

export const UserRouter = router;
