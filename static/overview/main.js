import { connect } from "../lib/wsConnectionHandler.js";
import { config } from "../lib/apiLoader.js";

const mainContent = document.getElementById("mainContent");
const create = document.getElementById("create");

create.addEventListener("click", async () => {
  let name = await config.createService(cookie.pwd);
  let u = new URL(location.href);
  u.searchParams.set("service", name);
  u.pathname = "/edit/";
  window.location = u;
});

let widgetLookup = {};

framework.ws.addModule(
  {
    pwd: cookie.pwd,
    update: async (data) => {
      widgetLookup = {};
      mainContent.innerHTML = "";
      for (let service of data) {
        let os = document.createElement("s-overview-service");
        mainContent.appendChild(os);
        await uiBuilder.ready(os);
        os.component.setWidgetData(service);
        widgetLookup[service[0].data] = os;
        return { success: true };
      }
    },
    updateSpecific: async (data) => {
      widgetLookup[data[0].data].component.setWidgetData(data);
      return { success: true };
    },
  },
  "overview"
);

await connect();
