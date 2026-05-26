const { WebSocketServer } = require("ws");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const { runScript } = require("./scriptLoader");
const { scripts } = require("./scripts");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const connections = {};
const users = {};
const getRand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let PORT = getRand(1000, 9999);
let IP = "";

function getInfo() {
  console.log(`Made inside get info, PORT: ${PORT}, IP: ${IP}`);
  return { PORT, IP };
}

function handleMessage(msg) {
  const data = JSON.parse(msg.toString());

  if (scripts[data]) {
    return runScript(scripts[data]);
  }
}

async function connection() {
  IP = (await runScript("getIp")).trim();

  wsServer.on("connection", (connection, request) => {
    const { username } = url.parse(request.url, true).query;

    if (!username) {
      connection.close();
      return;
    }

    const uuid = uuidv4();
    connections[uuid] = connection;
    users[uuid] = {
      username,
      state: {},
    };

    connection.on("message", (msg) => {
      return handleMessage(msg);
    });

    connection.on("close", () => {
      console.log(`${users[uuid].username} disconnected`);
      delete connections[uuid];
      delete users[uuid];
    });
  });
  server.listen(PORT, () => {
    console.log(`Websocket server is running on port: ${PORT}`);
  });
}

export { connection, getInfo };
