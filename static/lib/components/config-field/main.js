const inputLookup = {
  text: "input-text",
  bool: "input-bool",
};

export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.nameElem = this.document.getElementById("name");
    this.inputWrap = this.document.getElementById("inputWrap");
  }

  async setConfig(config, value) {
    this.nameElem.innerText = config.name;
    const configInput = document.createElement(inputLookup[config.type]);
    this.inputWrap.appendChild(configInput);
    this.configInput = configInput;
    await uiBuilder.ready(configInput);
    if (value || config.value)
      configInput.component.setValue(value ? value : config.value);
  }

  async getConfig() {
    return await this.configInput.component.getValue();
  }
}
