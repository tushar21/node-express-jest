import express, { Router, Request, Response } from 'express';
import User from '../interface/user';
import { createUser, getAllUsers ,userGetById,updateUser,deleteUser} from '../Controllers/userController';




const router: Router = express.Router();


router.get('/getAllUser', getAllUsers);
router.get('/getUserById/:Id',userGetById);
router.post('/createUser',createUser);
router.put('/updateUser/:Id',updateUser);
router.put('/deleteUserById/:Id',deleteUser)




export default router; 
