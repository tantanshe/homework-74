import express from "express";

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
    res.send("Messages are here");
})

messagesRouter.post("/", (req, res) => {
    res.send(req.body);
})

export default messagesRouter;