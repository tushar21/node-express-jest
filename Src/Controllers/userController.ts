import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

//Creating User
export const createUser = async function (req: Request, res: Response) {
  const userFound = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (userFound) {
    const err = "User allready exist with this email";
    res.status(404).json({ err });
    // stop further execution in this callback
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        isDeleted: null,
        password: req.body.password,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send("Somthing Went Worng");
  }
};

// Get User By Unique Id
export const userGetById = async function (req: Request, res: Response) {
  console.log("getUser", req.params.Id);

  const no = await Number(req.params.Id);
  if (isNaN(no)) {
    res.status(404).json("Invaild input");

    return;
  }
  const userFound = await prisma.user.findUnique({
    where: { id: no, isDeleted: null },
  });
  if (userFound) {
    res.status(200).json({ userFound });
    // stop further execution in this callback
    return;
  } else {
    res.status(404).json("User not found");
  }
};

//Get All Users
export const getAllUsers = async function (req: Request, res: Response) {
  const allUsers = await prisma.user.findMany();


  res.send(allUsers);
};

//Update User By Id
export const updateUser = async function (req: Request, res: Response) {
  try {
    const no = await Number(req.params.Id);
    if (isNaN(no)) {
      res.status(404).json("Invaild input");

      return;
    }
    const userFound = await prisma.user.findUnique({
      where: { id: no, isDeleted: null },
    });
    if (!userFound) {
      res.status(404).json("User not found");
      return;
    }
    const updateUser = await prisma.user.update({
      where: { id: no },
      data: { name: req.body.name },
    });

    res.status(200).json({ updateUser });

    return;
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went Worng");
  }
};

export const deleteUser = async function (req:Request,res:Response) {
  try {
    const no = await Number(req.params.Id);
    if (isNaN(no)) {
      res.status(404).json("Invaild input");

      return;
    }
    const userFound = await prisma.user.findUnique({
      where: { id: no, isDeleted: null },
    });
    if (!userFound) {
      res.status(404).json("User not found");
      return;
    }
    const updateUser = await prisma.user.update({
      where: { id: no },
      data: { isDeleted: new Date() },
    });

    res.status(200).json({ updateUser });

    return;
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went Worng");
  }
  
}
