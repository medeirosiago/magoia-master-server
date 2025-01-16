import { Router } from "express";
import { getText } from "./controller";

const openaiRouter = Router();

openaiRouter.get("/", getText);
// notionRouter.get('/page', fetchPage);

export default openaiRouter;
