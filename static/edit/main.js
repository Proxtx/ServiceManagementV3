import { config } from "../lib/apiLoader.js";

let u = new URL(location.href);
const service = u.searchParams.get("service");

const mainContent = document.getElementById("mainContent");
const title = document.getElementById("title");
const newButton = document.getElementById("newButton");
const saveButton = document.getElementById("save");
const deleteButton = document.getElementById("delete");
const insertButton = document.getElementById("insertButton");
const componentSelect = document.getElementById("componentSelect");

const availableComponents = await config.getAvailableComponents(cookie.pwd);

const applyOptionArray = async (elem, options) => {
  elem.innerHTML = "";
  for (let option of options) {
    let oElem = document.createElement("option");
    oElem.innerText = option;
    oElem.value = option;
    elem.appendChild(oElem);
  }
};

applyOptionArray(componentSelect, availableComponents);

title.innerText = service;

let serviceConfig = await config.getConfig(cookie.pwd, service);

let componentConfigs = [
  {
    configConfig: [
      { name: "name", type: "text" },
      { name: "path", type: "text" },
    ],
    config: {
      component: "service",
      config: { name: service, path: serviceConfig.path },
      fixed: true,
    },
  },
];

for (let c of serviceConfig.components) {
  let configConfig = await config.getConfigConfig(
    cookie.pwd,
    service,
    c.component
  );
  componentConfigs.push({ config: c, configConfig });
}

let componentConfigElements = [];

for (let componentConfig of componentConfigs) {
  let elem = document.createElement("s-component-config");
  componentConfigElements.push(elem);
  mainContent.insertBefore(elem, newButton);
  await uiBuilder.ready(elem);
  elem.component.setConfig(
    componentConfig.config,
    componentConfig.configConfig
  );
}

newButton.addEventListener("click", () => {
  insertButton.style.display = "block";
  newButton.style.display = "none";
  componentSelect.style.display = "block";
});

insertButton.addEventListener("click", async () => {
  insertButton.style.display = "none";
  componentSelect.style.display = "none";

  await updateServiceConfig();
  serviceConfig.components.push({
    component: componentSelect.value,
    config: {},
  });
  await config.saveConfig(cookie.pwd, service, serviceConfig);

  location.reload();
});

const updateServiceConfig = async () => {
  let resultingConfig = [];

  for (let c of componentConfigElements) {
    resultingConfig.push(await c.component.getConfig());
  }

  resultingConfig = resultingConfig.filter((v) => !v.deleted);

  let buildInConfig = resultingConfig.shift();
  serviceConfig.components = resultingConfig;
  serviceConfig.name = buildInConfig.config.name;
  serviceConfig.path = buildInConfig.config.path;
};

const saveService = async () => {
  await updateServiceConfig();
  await config.saveConfig(cookie.pwd, service, serviceConfig);
};

saveButton.addEventListener("click", async () => {
  await saveService();
  location.pathname = "/overview";
});

deleteButton.addEventListener("click", async () => {
  await config.deleteService(cookie.pwd, service);
  location.pathname = "/overview";
});
