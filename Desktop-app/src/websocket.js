const http = require("http");
const { URL } = require("url");
// const url = require("url"); // For old method
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");
const { runScript } = require("./scriptLoader");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const connections = {};
const users = {};

const genPort = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let PORT = genPort(1000, 9999);
let IP = "";

function getInfo() {
  console.log(`port: ${PORT} ip: ${IP}`);
  return { PORT, IP };
}

async function handleMessage(msg) {
  console.log(`Message Receive, messge: ${msg}`);
  const data = JSON.parse(msg.toString());

  if (data.type) {
    console.log(`Running ${data.type} script, with args: ${data.arg}`);
    return await runScript(data.type, [data.arg]);
  } else {
    console.error(`${data.type} script with arg: ${data.arg} not found`);
  }
}

async function connection() {
  IP = (await runScript("getIp")).trim();

  const HEARTBEAT_INTERVAL = 30000;
  // For every client connected, it will ping them
  const heartbeatInterval = setInterval(() => {
    wsServer.clients.forEach((connection) => {
      if (connection.isAlive === false) {
        return ws.terminate();
      }
      connection.isAlive = false;
      connection.ping((err) => {
        if (err) {
          console.error("Error sending ping, error was:", err.message);
        }
      });
    });
  }, HEARTBEAT_INTERVAL);

  wsServer.on("connection", (connection, request) => {
    connection.isAlive = true;

    // const { username } = url.parse(request.url, true).query; // Old method, new one not fully tested
    let baseURL = "http://" + request.hearders.host + "/";
    const { url } = new URL(request.url, baseURL);
    const { username } = url.get("username");

    if (!username) {
      connection.close();
      return;
    }

    // TODO: Unsure if this is needed information to keep
    const uuid = uuidv4();
    connections[uuid] = connection;
    users[uuid] = {
      username,
      state: {},
    };

    connection.on("pong", () => {
      connection.isAlive = true;
      connection.lastPong = Date.now();
      console.log("Server ponged");
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
