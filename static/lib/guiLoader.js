import { loadPack } from "/modules/uibuilder/main.js";

await loadPack("/lib/components/pack.json", {
  urlPrefix: "/lib/",
});

await loadPack("/modules/material/components/pack.json", {
  urlPrefix: "/modules/material/",
});
