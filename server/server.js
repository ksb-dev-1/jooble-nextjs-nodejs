// 3rd party libraries
import express from "express";
import dotenv from "dotenv";

// db
import connectDB from "./db/connectDB.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// middlewares
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/jooble/api/auth", authRoutes);
app.use("/jooble/api/users", userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
