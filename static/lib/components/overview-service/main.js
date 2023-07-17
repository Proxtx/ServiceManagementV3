import { registerDynamicComponent } from "/lib/gui.js";

export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.wrap = this.document.getElementById("wrap");
  }

  async setWidgetData(data) {
    this.wrap.innerHTML = "";
    this.wrap.addEventListener("click", () => {
      let u = new URL(location.href);
      u.searchParams.set("service", data[0].data);
      u.pathname = "/service/";
      window.location = u;
    });
    for (let component of data) {
      await registerDynamicComponent(
        component.name,
        component.html,
        component.css,
        component.js
      );
      let c = document.createElement("s-dynamic-" + component.name);
      this.wrap.appendChild(c);
      await uiBuilder.ready(c);
      c.component.setData && c.component.setData(component.data);
    }
  }
}
