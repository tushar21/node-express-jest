import express, { Router, Request, Response } from "express"; 
import router from "./Src/routes/userRoute";
import { PrismaClient } from "@prisma/client";
import taskrouter from "./Src/routes/taskRoute";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(router);
app.use(taskrouter);
app.get("/", function (req, res) {
  res.send("route is working");
});
try {
  app.listen(3000 , ()=>{
    console.log("server is running on PORT 3000")
  });
} catch (error) {
  console.log(error);
}
