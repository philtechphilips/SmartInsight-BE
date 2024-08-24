import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import v1Router from "./routes/index.js";
import Scheduler from "./schedular.js";
import rateLimit from 'express-rate-limit';


Scheduler.init();

const app = new express();

// Setup middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("tiny"));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many requests, please try again later.',
})

app.use(limiter);

app.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: "50mb" })
);
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: "100000" }));

app.use("/v1", v1Router);

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "SmartInsight Take-Home Assignment (SWE - JULAUG)",
  });
});

app.use(function (req, res, next) {
  res
    .status(404)
    .send({ responseCode: 404, message: "Invalid resource URL", data: [] });
  next();
});

export default app;
