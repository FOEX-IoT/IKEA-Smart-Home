import { Command } from '@entities';
import { execSync } from 'child_process';
import { redis } from '@server';
export default () => {
  setTimeout(() => {
    console.log("starting init");
    try {
      const get_devices = new Command("get", ["15001"]);
      console.log(get_devices.url);
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
    } catch (e) {
      console.error("error in get_devices");
    }
    console.log("finished init");
  });
}