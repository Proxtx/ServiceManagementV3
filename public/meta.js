import config from "@proxtx/config";

export const auth = async (pwd) => {
  return pwd == config.pwd;
};
