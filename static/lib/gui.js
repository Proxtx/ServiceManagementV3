export const registerDynamicComponent = async (name, html, css, js) => {
  if (!customElements.get("s-dynamic-" + name)) {
    try {
      await window.uiBuilder.loadComponent({
        template: encodeURIComponent(html),
        styles: [
          encodeURIComponent(await (await fetch("/lib/main.css")).text()),
          encodeURIComponent(css),
        ],
        component: encodeURIComponent(js),
        urlPrefix: "data:text/plain,",
        importPrefix: "data:text/javascript,",
        name: "s-dynamic-" + name,
      });
    } catch (e) {
      console.log(
        "Failed registering input. Probably because it was already registered in a different argument, while this process was running.",
        e
      );
    }
  }
};
