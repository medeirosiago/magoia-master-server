/**
 * Externals
 */
import { Router, Response } from 'express';
import notionRouter from '@api/notion';

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

export default router;