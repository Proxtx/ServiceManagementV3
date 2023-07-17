export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.check = this.document.getElementById("check");
  }

  async setValue(v) {
    await uiBuilder.ready(this.check);
    this.check.component.checked = v;
  }

  async getValue() {
    return this.check.component.checked;
  }
}
