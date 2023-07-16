import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";

setConfig({
  ignoreParseHtml: ["/lib/components"],
  customScriptFileExtensions: [".html", ".route"],
});

await listen(config.port);
console.log("Server started. Port:", config.port);
