import { redisClient } from './../Server';
import { Command } from './../entities/Command';
import { Router, Request, Response } from "express";
import { execSync, spawnSync, exec } from "child_process";

const router = Router();

router.get("/set_brightness", (req, res) => {
  // spawnSync("coap-client -m put -u \"denis4\" -k \"gcEH86cfOushVqJd\" -e '{ \"3311\": [{ \"5851\": 30 }] }' \"coaps://192.168.1.11:5684/15001/65547\"");
  spawnSync("coap-client -m put -u \"denis4\" -k \"gcEH86cfOushVqJd\" -e '{ \"3311\": [{ \"5851\": 127 }] }' \"coaps://192.168.1.11:5684/15001/65547\"")
  res.send("1231231231231");
})

router.get("/off", (req, res) => {
  spawnSync("coap-client -m put -u \"denis4\" -k \"gcEH86cfOushVqJd\" -e '{ \"3311\": [{ \"5850\": 0 }] }' \"coaps://192.168.1.11:5684/15001/65547\"");
  res.sendStatus(200);
})

router.get("/on", (req, res) => {
  let data = {
    "3311": [{
      "5850": 1
    }]
  }
  let command = new Command("put", ["15001", "65547"], data);
  spawnSync(command.url);
  res.sendStatus(200);
})

router.get("/test", (req, res) => {
  redisClient.get("lol", (err, replies) => {
    if (err) res.sendStatus(500);

    res.send(replies);
  });
})

export default router;