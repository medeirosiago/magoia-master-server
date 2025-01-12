/**
 * Externals
 */
import { Router, Response } from 'express';
import notionRouter from '@api/notion';
import openaiRouter from '@application/entrypoints/api/openai';

/**
 * Instance Router
 */
const router = Router();

/**
 * Routes
 */
router.get('/', (_req, res: Response) => {
  res.send('Hello, TypeScript with Express!!!!');
});

router.use('/notion', notionRouter);
router.use('/gpt', openaiRouter);

export default router;