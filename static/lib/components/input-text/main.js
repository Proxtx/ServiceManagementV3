export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.input = this.document.getElementById("input");
  }

  setValue(v) {
    this.input.value = v;
  }

  getValue() {
    return this.input.value;
  }
}
