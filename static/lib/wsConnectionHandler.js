export const connect = async () => {
  let result;
  let r;
  (async () => {
    result = await framework.ws.serve();
    r && r();
  })();
  setTimeout(() => r(), 5000);
  await new Promise((resolve) => (r = resolve));
  if (!result) {
    console.log("ws failed retry in 5 seconds");
    await new Promise((r) => setTimeout(r, 5000));
    connect();
    return;
  }

  console.log("connection established");
  result.ws.addEventListener("close", () => {
    console.log("connection lost");
    connect();
  });

  let ws = result.ws;

  while (ws.readyState !== WebSocket.CLOSED) {
    ws.send("PING");
    await new Promise((r) => setTimeout(r, 500));
  }
};
