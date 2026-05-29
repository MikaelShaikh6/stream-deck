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

  if (scripts[data.type]) {
    return runScript(scripts[data.type], scripts[data.arg]);
  } else {
    console.error("Script not found");
  }
}

async function connection() {
  const HEARTBEAT_INTERVAL = 30000;
  const HEARTBEAT_TIMEOUT = 10000;

  IP = (await runScript("getIp")).trim();

  const heartbeatInterval = setInterval(() => {
    wsServer.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping((err) => {
        if (err) {
          console.error("Error sending ping", err.message);
        }
      });
    });
  }, HEARTBEAT_INTERVAL);

  wsServer.on("connection", (connection, request) => {
    connection.isAlive = true;

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

    connection.on("pong", () => {
      connection.isAlive = true;
      connection.lastPong = Date.now();
      console.log("got pong");
    });

    connection.on("message", (msg) => {
      connection.isAlive = true;
      return handleMessage(msg);
    });

    connection.on("close", () => {
      clearInterval(heartbeatInterval);
      console.log(`${users[uuid].username} disconnected`);
      delete connections[uuid];
      delete users[uuid];
    });
  });

  wsServer.on("close", () => clearInterval(heartbeatInterval));
  server.listen(PORT, () => {
    console.log(`Websocket server is running on port: ${PORT}`);
  });
}

export { connection, getInfo };
