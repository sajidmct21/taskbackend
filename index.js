// import express from "express";
// import env from "dotenv";
// import cors from 'cors'
// import userRuter from './routes/user.router.js'
// import taskRouter from './routes/task.router.js'
// import verifyToken from "./middleware/verifyToken.js";
// import dbConnection from "./dbconnection/dbConnection.js";

// const app = express();
// env.config();
// app.use(cors())

// // Middlewares
// app.use(express.json());

// // app.use("/", (req, res) => {
// //   res.send(`Hello from backend and TaskDB`);
// // });

// app.use('/api/v1',userRuter)
// // app.use('/api/v2',verifyToken,taskRouter)
// app.use('/api/v2',taskRouter)

// // Global Error Handler
// app.use((err, req, res, next) => {
//   res.status(err.statusCode || err.status || 500).json({
//     statusCode: err.statusCode,
//     name: err.name,
//     message: err.message,
//     stack: err.stack,
//   });
// });

// const port = 3000;
// dbConnection();
// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });





import express from "express";
import env from "dotenv";
import cors from "cors";

import userRouter from "../routes/user.router.js";
import taskRouter from "../routes/task.router.js";
import dbConnection from "../dbconnection/dbConnection.js";

env.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v2", taskRouter);

// Health check (optional but recommended)
app.get("/", (req, res) => {
  res.send("Task Management Backend running on Vercel 🚀");
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

// 🔴 IMPORTANT FOR VERCEL
dbConnection();
export default app;
