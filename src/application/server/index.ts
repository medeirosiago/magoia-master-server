/**
 * Externals
 */
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

/**
 * Configs
 */
dotenv.config();

const app = express();

const { PI_LOCAL_ADDRESS, PI_LOCAL_PORT } = process.env;

/**
 * Routes
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!!!!');
});

app.listen(PI_LOCAL_PORT, () => {
  console.log(`Server is running at http://${PI_LOCAL_ADDRESS}:${PI_LOCAL_PORT}`);
});
