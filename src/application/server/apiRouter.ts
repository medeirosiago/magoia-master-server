/**
 * Externals
 */
import { Router, Response } from 'express';
import notionRouter from '@api/notion';
import openaiRouter from '@application/entrypoints/api/openai';
import homeAssitantRouter from '@application/entrypoints/api/homeassistant'

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
router.use('/ha', homeAssitantRouter);

export default router;