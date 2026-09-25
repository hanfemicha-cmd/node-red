const http = require('http');
const express = require('express');
const RED = require('node-red');

const app = express();
app.use("/", express.static("public"));

const server = http.createServer(app);
const settings = {
    uiPort: process.env.PORT || 8000,
    userDir: "./.node-red",
    functionGlobalContext: {}
};

RED.init(server, settings);
app.use(settings.httpAdminRoot || "/", RED.httpAdmin);
app.use(settings.httpNodeRoot || "/api", RED.httpNode);

server.listen(settings.uiPort, () => {
    console.log(`Node-RED is running on port ${settings.uiPort}`);
});
