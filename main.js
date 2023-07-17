import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";
import { genHandler } from "./private/combineHandler.js";

setConfig({
  ignoreParseHtml: ["/lib/components"],
  customScriptFileExtensions: [".html", ".route"],
  logs: false,
});

let result = await listen(config.port);
let combineHandler = await result.combineHandler(result.server);
combineHandler.onCombine("overview", genHandler("overview"));
combineHandler.onCombine("service", genHandler("service"));
console.log("Server started. Port:", config.port);
