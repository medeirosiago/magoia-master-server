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
const port = 3123;

const piLocalAddress = process.env.PI_LOCAL_ADDRESS || 'localhost';

/**
 * Routes
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!!!!');
});

app.listen(port, () => {
  console.log(`Server is running at http://${piLocalAddress}:${port}`);
});
