import fs from "fs/promises";
import { emit } from "./combineHandler.js";

const overviewHTML = await fs.readFile(
  "private/serviceComponent/index.html",
  "utf8"
);
const overviewCSS = await fs.readFile(
  "private/serviceComponent/style.css",
  "utf8"
);
const overviewJS = await fs.readFile(
  "private/serviceComponent/main.js",
  "utf8"
);

const mainHTML = await fs.readFile("private/pathComponent/index.html", "utf8");
const mainCSS = await fs.readFile("private/pathComponent/style.css", "utf8");
const mainJS = await fs.readFile("private/pathComponent/main.js", "utf8");

let imports = {};

export class Service {
  components = [];

  constructor(config) {
    this.config = config;
    this.initPromise = this.setupComponents();
  }

  async setupComponents() {
    for (let config of this.config.components) {
      if (!this.components[config.component]) {
        imports[config.component] = await import(
          "../components/" + config.component + "/main.js"
        );
      }
      this.components.push({
        import: new imports[config.component].Component(this, config.config),
        name: config.component,
      });
    }
  }

  async getSmallWidget() {
    let result = [];

    result.push({
      data: this.config.name,
      html: overviewHTML,
      css: overviewCSS,
      js: overviewJS,
      name: "service-name",
    });

    for (let component of this.components) {
      if (component.import.smallWidgets)
        for (let smallWidget of component.import.smallWidgets) {
          let data = await component.import.getData(smallWidget);
          let html = await getStaticFile(
            "components/" + component.name + "/" + smallWidget + "/index.html"
          );
          let css = await getStaticFile(
            "components/" + component.name + "/" + smallWidget + "/style.css"
          );
          let js = await getStaticFile(
            "components/" + component.name + "/" + smallWidget + "/main.js"
          );
          result.push({
            data,
            html,
            css,
            js,
            name: component.name + "-" + smallWidget,
          });
        }
    }

    return result;
  }

  async getMainWidget() {
    let result = [];

    result.push({
      data: this.config.path,
      html: mainHTML,
      css: mainCSS,
      js: mainJS,
      name: "service-path",
    });

    for (let component of this.components) {
      if (component.import.mainWidgets)
        for (let mainWidget of component.import.mainWidgets) {
          let data = await component.import.getData(mainWidget);
          let html = await getStaticFile(
            "components/" + component.name + "/" + mainWidget + "/index.html"
          );
          let css = await getStaticFile(
            "components/" + component.name + "/" + mainWidget + "/style.css"
          );
          let js = await getStaticFile(
            "components/" + component.name + "/" + mainWidget + "/main.js"
          );
          result.push({
            data,
            html,
            css,
            js,
            name: component.name + "-" + mainWidget,
          });
        }
    }

    return result;
  }

  async viewReload() {
    try {
      emit("service-" + this.config.name, "update", await this.getMainWidget());
    } catch (e) {
      console.log("View reload error.", e);
    }
  }

  async viewUpdate(componentName, widget) {
    try {
      for (let component of this.components) {
        if (component.name == componentName)
          emit(
            "service-" + this.config.name,
            "updateSpecific",
            component.name + "-" + widget,
            await component.import.getData(widget)
          );
      }
    } catch (e) {
      console.log("View update error.", e);
    }
  }

  async overviewReload() {
    try {
      emit("overview", "updateSpecific", await this.getSmallWidget());
    } catch (e) {
      console.log("Overview reload error.", e);
    }
  }
}

const staticFilCache = {};

const getStaticFile = async (path) => {
  if (!staticFilCache[path])
    staticFilCache[path] = await fs.readFile(path, "utf8");
  return staticFilCache[path];
};
