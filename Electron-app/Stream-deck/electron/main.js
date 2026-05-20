import http from "http";
import { WebSocketServer } from "ws";
import url from "url";
import { v4 as uuidv4 } from "uuid";

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

const connections = {};
const users = {};

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();

  connections[uuid] = connection;
  users[uuid] = {
    username: username,
    states = {
        // This is where all the states for each property that can be changed
    }
  };

  console.log(uuid);
});

server.listen(port, () => {
  console.log(`Websocket server is running on port: ${port}`);
});
