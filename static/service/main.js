import { connect } from "../lib/wsConnectionHandler.js";
import { registerDynamicComponent } from "../lib/gui.js";

let u = new URL(location.href);
const service = u.searchParams.get("service");

const mainContent = document.getElementById("mainContent");
const title = document.getElementById("title");

title.innerText = service;

let widgetLookup = {};

framework.ws.addModule(
  {
    pwd: cookie.pwd,
    service,
    update: async (data) => {
      mainContent.innerHTML = "";
      widgetLookup = {};
      for (let widget of data) {
        await registerDynamicComponent(
          widget.name,
          widget.html,
          widget.css,
          widget.js
        );
        let cmp = document.createElement("s-dynamic-" + widget.name);
        mainContent.appendChild(cmp);
        await uiBuilder.ready(cmp);
        cmp.component.setData && cmp.component.setData(widget.data);
        widgetLookup[widget.name] = cmp;
      }
      return { success: true };
    },
    updateSpecific: async (name, data) => {
      widgetLookup[name].component.setData(data);
    },
  },
  "service"
);

connect();
