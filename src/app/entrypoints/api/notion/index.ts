import { Router } from "express";
import { fetchDatabase } from "./controller";

const notionRouter = Router();

notionRouter.get("/database", fetchDatabase);
// notionRouter.get('/page', fetchPage);

export default notionRouter;
