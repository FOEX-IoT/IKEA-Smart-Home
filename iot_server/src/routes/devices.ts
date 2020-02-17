import { redis } from './../Server';
import { Router, Request, Response } from "express";

const router = Router();

router.get("/get_devices", (req: Request, res: Response) => {
  redis.smembers("devIDs", (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(result);
  });
})

export default router;