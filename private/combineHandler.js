import config from "@proxtx/config";
import { getSmallWidgets } from "./serviceManager.js";
import { services } from "./serviceManager.js";

const combines = {};

export const genHandler = (type) => {
  return async (module) => {
    try {
      if ((await module.pwd) == config.pwd) {
        if (typeScripts[type]) {
          let evaluatedType = await typeScripts[type](module, type);
          combines[evaluatedType]
            ? combines[evaluatedType].push(module)
            : (combines[evaluatedType] = [module]);
        }
      } else console.log("Combine auth error");
    } catch (e) {
      console.log("Combine WS Error!\n", e);
    }
  };
};

const typeScripts = {
  overview: async (module, type) => {
    module.update(await getSmallWidgets());
    return type;
  },
  service: async (module, type) => {
    const serviceName = await module.service;
    for (let service of services)
      if (service.config.name == serviceName)
        module.update(await service.getMainWidget());
    return type + "-" + serviceName;
  },
};

export const emit = async (type, method, ...args) => {
  if (!combines[type]) return;
  try {
    for (let combineIndex in combines[type]) {
      let result = await combines[type][combineIndex][method](...args);
      if (!result || !result.success) delete combines[combineIndex];
    }
  } catch (e) {
    console.log("Combine emit error.", e);
  }
};
