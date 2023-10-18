import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasks = await prisma.task.findMany();

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Creating Task
export const createTask = async function (
  req: Request,
  res: Response
): Promise<void> {
  const no = await Number(req.body.userId);
  console.log(no,"no");
  const createdDate = new Date();
  const dueDate = new Date(req.body.dueDate);

  //Checking dates due date or Time Should be greater than Create Date Or Time
  if (createdDate > dueDate) {
    res.status(500).json("created date  or Time is less than due date");
    return;
  }
  if (isNaN(no)) {
    res.status(404).json("Invaild input");

    return;
  }
  console.log(req.body);

  const userFound = await prisma.user.findUnique({
    where: { id: no, isDeleted: null },
  });
  if (!userFound) {
    const err = "User you want to assign this is not found";
    res.status(404).json({ err });
    // stop further execution in this callback
    return;
  }

  try {
    const taskCreate = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        userId: no,
        category: req.body.category,
        status: req.body.status,
        IsDeleted: null,
      },
    });
    res.send(taskCreate);
  } catch (error) {
    console.log(error);
    res.send("Somthing Went Worng");
  }
};
export const getTaskById = async function (req: Request, res: Response) {
  const no = await Number(req.params.Id);
  if (isNaN(no)) {
    res.status(404).json("Invaild input");

    return;
  }

  try {
    const taskFound = await prisma.task.findUnique({
      where: {
        id: no,
      },
    });
    if (!taskFound) {
      res.status(404).json("Task Not Found");
      return;
    }
    res.status(200).json(taskFound);
  } catch (error) {
    res.status(404).json("Somthing went worng");
    console.log(error);
    return;
  }
};

export const getTaskByCat = async function (req: Request, res: Response) {
  try {
    const tasksFound = await prisma.task.findMany({
      where: {
        category: req.params.Cat,
      },
    });
    if (tasksFound.length === 0) {
      res.status(404).json(" NO task with this category Found");
      return;
    }
    res.status(200).json(tasksFound);
  } catch (error) {
    res.status(404).json("Somthing went worng");
    console.log(error);
    return;
  }
};
export const updateTask = async function (req: Request, res: Response) {
  console.log(req.body);
  console.log(req.params.Id);
  const no = await Number(req.params.Id);
  if (isNaN(no)) {
    res.status(404).json("Invaild input");

    return;
  }

  try {
    const taskFound = await prisma.task.findUnique({
      where: {
        id: no,
      },
    });
    if (!taskFound) {
      res.status(404).json("Task Not Found");
      return;
    }
    const userId = await Number(req.body.userId);
    if (isNaN(userId)) {
      res.status(404).json("Invaild input (UserId)");

      return;
    }
    const updateTask = await prisma.task.update({
      where: { id: no },
      data: {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        userId: userId,
        category: req.body.category,
        status: req.body.status,
      },
    });

    res.status(200).json(taskFound);
  } catch (error) {
    res.status(404).json("Somthing went worng");
    console.log(error);
    return;
  }
};

export const deleteTask = async function (req: Request, res: Response) {
  console.log(req.body);
  console.log(req.params);
  const no = await Number(req.params.Id);
  if (isNaN(no)) {
    res.status(404).json("Invaild input");

    return;
  }

  try {
    const taskFound = await prisma.task.findUnique({
      where: {
        id: no,
        IsDeleted: null,
      },
    });
    if (!taskFound) {
      res.status(404).json("Task Not Found");
      return;
    }
    const deleteTask = await prisma.task.update({
      where: { id: no },
      data: {
        IsDeleted: new Date(),
      },
    });

    res.status(200).json(deleteTask);
  } catch (error) {
    res.status(404).json("Somthing went worng");
    console.log(error);
    return;
  }
};
