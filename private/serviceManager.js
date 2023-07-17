import { readFile, writeFile } from "./file.js";
import { Service } from "./service.js";

let file = await readFile();

export let services = [];

export const getSmallWidgets = async () => {
  let res = [];
  for (let service of services) {
    res.push(await service.getSmallWidget());
  }

  return res;
};

const initServices = () => {
  for (let service of file.services) {
    services.push(new Service(service));
  }
};

initServices();
