export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.name = this.document.getElementById("name");
  }

  setData(data) {
    this.name.innerText = data;
  }
}
