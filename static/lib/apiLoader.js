export const config = await framework.load("config.js");
export const runApi = await framework.load("run.js");
export const meta = await framework.load("meta.js");

let u = new URL(location.href);
const service = u.searchParams.get("service");
export const run = async (component, method, ...args) => {
  return await runApi.run(cookie.pwd, service, component, method, ...args);
};

window.run = run;
