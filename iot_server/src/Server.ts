import { execSync } from 'child_process';

import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import Router from './routes';

// import redis from "redis";
import Redis from "ioredis";

export const redis = new Redis();

redis.on("error", err => {
    console.error(err);
});

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use('/api', Router);

const staticDir = path.join(process.cwd(), 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: staticDir });
});

// Export express instance
export default app;