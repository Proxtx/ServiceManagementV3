import { auth } from "./meta.js";
import { services, getSmallWidgets } from "../private/serviceManager.js";
import { Service } from "../private/service.js";
import { readFile, writeFile } from "../private/file.js";
import { emit } from "../private/combineHandler.js";
import fs from "fs/promises";

export const getAvailableComponents = async (pwd) => {
  if (!auth(pwd)) return;
  return await fs.readdir("components");
};

export const getConfig = async (pwd, service) => {
  if (!auth(pwd)) return;
  for (let s of services) if (s.config.name == service) return s.config;
};

export const getConfigConfig = (pwd, service, component) => {
  if (!auth(pwd)) return;
  let ser;
  for (let s of services) if (s.config.name == service) ser = s;
  for (let c of ser.components) {
    if (c.name == component) return c.import.configConfig;
  }
};

export const saveConfig = async (pwd, service, config) => {
  if (!auth(pwd)) return;
  for (let serviceIndex in services)
    if (services[serviceIndex].config.name == service) {
      for (let component of services[serviceIndex].components)
        component.import.unload && component.import.unload();
      let s = new Service(config);
      services[serviceIndex] = s;
      await s.initPromise;
      s.viewReload();
    }

  let file = await readFile();
  for (let serviceIndex in file.services)
    if (file.services[serviceIndex].name == service)
      file.services[serviceIndex] = config;

  writeFile(file);

  emit("overview", "update", await getSmallWidgets());
};

export const deleteService = async (pwd, service) => {
  if (!auth(pwd)) return;
  for (let serviceIndex in services)
    if (services[serviceIndex].config.name == service)
      services.splice(serviceIndex, 1);

  let file = await readFile();
  for (let serviceIndex in file.services)
    if (file.services[serviceIndex].name == service)
      file.services.splice(serviceIndex, 1);
  writeFile(file);

  emit("overview", "update", await getSmallWidgets());
};

export const createService = async (pwd) => {
  if (!auth(pwd)) return;

  let name = "New service";
  let config = { name, path: "/", components: [] };
  services.push(new Service(config));

  let file = await readFile();
  file.services.push(config);
  writeFile(file);

  emit("overview", "update", await getSmallWidgets());

  return name;
};
