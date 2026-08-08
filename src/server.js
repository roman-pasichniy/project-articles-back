import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { connectToMongoDB } from "./db/connectToMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { logger } from "./middleware/logger.js";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/authRouter.js";
import { usersRouter } from "./routes/usersRouter.js";
import { articlesRouter } from "./routes/articlesRouter.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles", articlesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectToMongoDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
