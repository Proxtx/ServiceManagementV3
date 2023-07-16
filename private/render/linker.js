export const server = async (document) => {
  let head = document.documentElement.children[0];
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", "/lib/main.css");
  head.appendChild(link);
  link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", "style.css");
  head.appendChild(link);

  let script = document.createElement("script");
  script.setAttribute("type", "module");
  script.setAttribute("src", "/lib/guiLoader.js");
  document.body.appendChild(script);

  script = document.createElement("script");
  script.setAttribute("type", "module");
  script.setAttribute("src", "main.js");
  document.body.appendChild(script);
};
