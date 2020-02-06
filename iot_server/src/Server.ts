
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import Router from './routes';

import redis from "redis";
// import { promisifyAll } from "bluebird";

// const asyncRedis: any = promisifyAll(redis);

export const redisClient = redis.createClient();

redisClient.on("error", err => {
    console.error(err);
});

redisClient.get("lol", (err, replies) => {
    if (err) console.error(err);
    console.log(replies);
});

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use('/api', Router);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: staticDir });
});

// Export express instance
export default app;
