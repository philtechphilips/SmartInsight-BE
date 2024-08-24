import express from "express";
import autoBotsRouter from "./bots";

const Router = express.Router();

Router.get("/", (req, res) => {
    res.send({
        status: 200,
        message: "SmartInsight Take-Home Assignment (SWE - JULAUG)"
    })
})


Router.use('/autobots', autoBotsRouter);

Router.use(function (req, res, next) {
    res.status(404).send({ responseCode: 404, message: 'Invalid resource URL', data: [] });
    next();
})

export default Router;