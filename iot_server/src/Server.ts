import { execSync } from 'child_process';

import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import Router from './routes';

// import redis from "redis";
import Redis from "ioredis";
import { Command } from './entities/Command';

export const redis = new Redis();

redis.on("error", err => {
    console.error(err);
});

const get_devices = new Command("get", ["15001"]);
let result = execSync(get_devices.url).toString();
let resJSON = JSON.parse(result);
redis.del("devIDs");
redis.sadd("devIDs", resJSON);


redis.del("lights");
resJSON.forEach((id: number) => {
    const get_device = new Command("get", ["15001", id + ""]);
    let result = execSync(get_device.url).toString();
    let json = JSON.parse(result)
    if (json["3"]["1"].includes("bulb")) {
        redis.hmset(`light:${id}`, {
            name: json["9001"]
        });
        redis.sadd("lights", id + "");
    }
});

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use('/api', Router);

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: staticDir });
});

// Export express instance
export default app;
