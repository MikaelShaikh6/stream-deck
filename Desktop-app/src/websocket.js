const { WebSocketServer } = require("ws");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const { runScript } = require("./scriptLoader");
const { scripts } = require("./scripts");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;
const connections = {};
const users = {};

function getIp() {
  return runScript("getip");
}

let returnedData;
function handleMessage(msg) {
  const data = JSON.parse(msg.toString());

  if (scripts[data]) {
    return runScript(scripts[data]);
  }
}

function connection() {
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
  server.listen(port, () => {
    console.log(`Websocket server is running on port: ${port}`);
  });
}

module.exports = { connection };
