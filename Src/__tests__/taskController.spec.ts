import { Request, Response } from "express";
import { PrismaClient, Status } from "@prisma/client";
import { createTask, getAllTask, getTaskByCat, getTaskById, updateTask } from "../Controllers/taskController";
const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      task: {
        findMany: jest.fn(),
        findUnique : jest.fn(),
        create: jest.fn(),
        update:jest.fn()
        

      },
      user: {
        findMany: jest.fn(),
        findUnique : jest.fn(),
        create: jest.fn(),
        

      },
    })),
  };
});


describe("getAllTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTasks = [
    {
      id: 4,
      title: "testTask2",
      description: "testDescp",
      creationDate: new Date("2023-10-12T10:29:49.718Z"),
      dueDate: new Date("2023-10-13T06:48:56.265Z"),
      userId: 10,
      category: "testCat",
      status: "Pending" as Status,
      IsDeleted: new Date("2023-10-12T11:43:17.442Z"),
    },
  ];

  it("should return a list of tasks", async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), // Ensure res has the status function
    json: jest.fn(),} as unknown as Response;

    res.json(mockTasks)
    await getAllTask(req, res);
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe("taskCreate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTasks = 
    {
      id: 4,
      title: "testTask2",
      description: "testDescp",
      creationDate: new Date("2023-10-12T10:29:49.718Z"),
      dueDate: new Date("2023-10-13T06:48:56.265Z"),
      userId: 10,
      category: "testCat",
      status: "Pending" as Status,
      IsDeleted: new Date("2023-10-12T11:43:17.442Z"),
    }
  ;

  it("should return a created tasks", async () => {
    const userId = 10; // Replace with the user ID you want to find
    const user = {
      userFound: {
        id: userId,
        createdAt: "2023-10-12T07:01:10.421Z",
        email: "testUser10@gmail.com",
        name: "testName10",
        role: "User",
        isDeleted: null,
        password: "1"
      }
    };
  
    (prisma.task.create as jest.Mock).mockResolvedValue(mockTasks);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);



    const req = { body:{
      title:"testTask1",
      description:"testDescp",
      dueDate:"2023-10-19T06:48:56.265Z",
      userId:"10",
      category:"testCat",
      status:"Pending"
    }
    }  as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), // Ensure res has the status function
    json: jest.fn(),} as unknown as Response;

    res.json(mockTasks)
    await createTask(req, res);
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });
});
    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



describe(" getTaskById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });const mockTask = 
  {
    "id": 4,
    "title": "testTask2",
    "description": "testDescp",
    "creationDate": "2023-10-12T10:29:49.718Z",
    "dueDate": "2023-10-13T06:48:56.265Z",
    "userId": 10,
    "category": "testCat",
    "status": "Pending",
    "IsDeleted": "2023-10-12T11:43:17.442Z"
}
  ;

  

  it("should return a list of tasks", async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

    const req = {params:"4",} as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), // Ensure res has the status function
    json: jest.fn(),} as unknown as Response;

    res.json(mockTask)
    await getTaskById(req, res);
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


describe(" getTaskByCat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });const mockTasks = [
    {
        "id": 4,
        "title": "testTask2",
        "description": "testDescp",
        "creationDate": "2023-10-12T10:29:49.718Z",
        "dueDate": "2023-10-13T06:48:56.265Z",
        "userId": 10,
        "category": "testCat",
        "status": "Pending",
        "IsDeleted": "2023-10-12T11:43:17.442Z"
    }
];
 

  

  it("should return a list of tasks with same  category", async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const req = {params:"4",} as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), // Ensure res has the status function
    json: jest.fn(),} as unknown as Response;

    res.json(mockTasks)
    await getTaskById(req, res);
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it("should return a updated task", async () => {

  const userId = 10; // Replace with the user ID you want to find
  const user = {
    userFound: {
      id: userId,
      createdAt: "2023-10-12T07:01:10.421Z",
      email: "testUser10@gmail.com",
      name: "testName10",
      role: "User",
      isDeleted: null,
      password: "1"
    }
  };
  const mockTask = {
    updateUser: {
        id: 10,
        createdAt: "2023-10-12T07:01:10.421Z",
        email: "testUser10gmai.com",
        name: "Upatetest",
        role: "User",
        isDeleted: null,
        password: "1"
    },
};
 // Replace with the user ID you want to find
  

  (prisma.task.update as jest.Mock).mockResolvedValue(mockTask);

  (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);



  const req = { body:{
    
      name:"Upatetest"
      
  
  
  },
  params: {
    Id: "4"
  }
}  as unknown as Request;
  const res = { status: jest.fn().mockReturnThis(), // Ensure res has the status function
  json: jest.fn(),} as unknown as Response;

  res.json(mockTask)
  await updateTask(req, res);
  // expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(mockTask);
});

  