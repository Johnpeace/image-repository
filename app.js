import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import AppError from "./server/utils/app-error";
import globalError from "./server/utils/global-error";
import Route from "./server/route/route";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());

// const router = express.Router();
// app.use("/api/v1", Route(router));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

export default app;
