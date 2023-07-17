export class Component {
  fieldElements = {};

  constructor(options) {
    this.document = options.shadowDom;
    this.component = options.component;
    this.wrap = this.document.getElementById("wrap");
    this.componentNameElem = this.document.getElementById("componentName");
  }

  async setConfig(config, configConfig) {
    this.componentNameElem.innerText = config.component;
    this.presetConfig = config;
    for (let configData of configConfig) {
      let field = document.createElement("s-config-field");
      this.wrap.appendChild(field);
      this.fieldElements[configData.name] = field;
      await uiBuilder.ready(field);
      field.component.setConfig(configData, config.config[configData.name]);
    }
    if (!config.fixed) {
      let btn = document.createElement("m-button");
      this.wrap.appendChild(btn);
      btn.innerText = "delete";
      await uiBuilder.ready(btn);
      let red = btn.component.component.style.red;
      btn.component.component.style.accentColor = red;
      btn.component.component.style.scale = 0.8;
      btn.style.float = "right";
      btn.addEventListener("click", () => {
        this.presetConfig.deleted = true;
        this.component.style.display = "none";
      });
    }
  }

  async getConfig() {
    for (let v in this.fieldElements) {
      this.presetConfig.config[v] = await this.fieldElements[
        v
      ].component.getConfig();
    }
    return this.presetConfig;
  }
}
