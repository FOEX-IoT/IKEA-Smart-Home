import { redisClient } from './../Server';
import { Command } from './../entities/Command';
import { Router } from "express";
import { execSync } from "child_process";
import { isNumber } from 'util';

const router = Router();

router.post("/set_brightness/:brightness", (req, res) => {
  const { brightness } = req.params;
  if (!isNumber(Number(brightness))) {
    res.status(300).send("brightness isn't a number");
    return;
  }
  const brightNum = Number(brightness);
  if (!(0 <= brightNum && brightNum <= 254)) {
    res.status(300).send("brightness isn't between 0 and 254");
    return;
  }

  let data = {
    "3311": [{
      "5851": brightNum
    }]
  };
  let command = new Command("put", ["15001", "65547"], data);
  execSync(command.url);
  res.sendStatus(200);
})

router.post("/off", (req, res) => {
  let data = {
    "3311": [{
      "5850": 0
    }]
  }
  let command = new Command("put", ["15001", "65547"], data);
  execSync(command.url);
  res.sendStatus(200);
})

router.post("/on", (req, res) => {
  let data = {
    "3311": [{
      "5850": 1
    }]
  }
  let command = new Command("put", ["15001", "65547"], data);
  execSync(command.url);
  res.sendStatus(200);
})

export default router;