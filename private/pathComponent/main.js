export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.path = this.document.getElementById("path");
  }

  setData(data) {
    this.path.innerText = data;
  }
}
