import { redis } from './../Server';
import { Command } from './../entities/Command';
import { Router } from "express";
import { execSync } from "child_process";
import { isNumber } from 'util';

const router = Router();

router.get("/get_lights", (req, res) => {
  redis.smembers("lights", (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = {
      status: "OK",
      data: [] as Object[]
    };

    const promises: Promise<Object>[] = [];

    result.forEach(id => {
      promises.push(redis.hgetall(`light:${id}`));
    })
    Promise.all(promises)
      .then(val => {
        data.data = val;
        res.send(data);
      })
      .catch(err => res.sendStatus(500));
  })
});

router.post("/light/:id/set_brightness/:brightness", (req, res) => {
  const { id, brightness } = req.params;
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
  let command = new Command("put", ["15001", id], data);
  execSync(command.url);
  res.sendStatus(200);
});


router.post("/light/:id/off", (req, res) => {
  const { id } = req.params;
  let data = {
    "3311": [{
      "5850": 0
    }]
  }
  let command = new Command("put", ["15001", id], data);
  execSync(command.url);
  res.sendStatus(200);
});

router.post("/light/:id/on", (req, res) => {
  const { id } = req.params;
  let data = {
    "3311": [{
      "5850": 1
    }]
  }
  let command = new Command("put", ["15001", id], data);
  execSync(command.url);
  res.sendStatus(200);
});

export default router;