import { services } from "../private/serviceManager.js";
import { auth } from "./meta.js";

export const run = async (pwd, service, component, method, ...args) => {
  if (!auth(pwd)) return;
  for (let serviceObj of services)
    if (serviceObj.config.name == service)
      for (let componentObj of serviceObj.components)
        if (componentObj.name == component)
          return await componentObj.import.functions[method](...args);
};
