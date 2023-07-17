import fs from "fs/promises";

export const readFile = async () => {
  return JSON.parse(await fs.readFile("services.json", "utf8"));
};

export const writeFile = async (data) => {
  await fs.writeFile("services.json", JSON.stringify(data, null, 2));
};
