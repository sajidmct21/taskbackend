import express from "express";
import env from "dotenv";
import cors from "cors";
import userRuter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";
import verifyToken from "./middleware/verifyToken.js";
import dbConnection from "./dbconnection/dbConnection.js";

const app = express();
env.config();
app.use(cors());

// Middlewares
app.use(express.json());

app.use("/", (req, res) => {
  res.send(`Hello from backend and TaskDB`);
});

app.use("/api/v1", userRuter);
// app.use('/api/v2',verifyToken,taskRouter)
app.use("/api/v2", taskRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || err.status || 500).json({
    statusCode: err.statusCode,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

const port = 3000;
dbConnection();
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
