import { connect } from "../lib/wsConnectionHandler.js";

const mainContent = document.getElementById("mainContent");

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
