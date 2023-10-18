import express, { Router, Request, Response } from 'express';
import User from '../interface/user';
import { Task } from '@prisma/client';
import { getAllTask ,createTask, getTaskById,getTaskByCat, updateTask,deleteTask} from '../Controllers/taskController';

const taskrouter: Router = express.Router();
taskrouter.get("/getAllTask",getAllTask)
taskrouter.post("/createTask",createTask)
taskrouter.get("/task/:Id",getTaskById)
taskrouter.get("/taskCat/:Cat",getTaskByCat)
taskrouter.put("/task/:Id",updateTask)
taskrouter.put('/taskDelete/:Id',deleteTask)






export default taskrouter; 
