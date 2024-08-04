import express from "express";
import {promises as fs} from 'fs';

const messagesRouter = express.Router();
const path = './messages';

messagesRouter.post("/", async (req, res) => {
    const messageData = req.body;
    const datetime = new Date().toISOString();
    const fileName = `./messages/${datetime}.txt`;
    const message = {
        ...messageData,
        datetime,
    };
    await fs.writeFile(fileName, JSON.stringify(message));
    console.log(req.body);
    res.send(req.body);
})

messagesRouter.get("/", async (req, res) => {
    const files = await fs.readdir(path);
    const sortedFiles = files.sort().reverse();
    const recentFiles = sortedFiles.slice(0, 5);
    const messages = await Promise.all(
        recentFiles.map(async (file) => {
            const filePath = path + '/' + file;
            const fileContent = await fs.readFile(filePath);
            return JSON.parse(fileContent.toString());
        })
    );
    res.send(messages);
})

export default messagesRouter;