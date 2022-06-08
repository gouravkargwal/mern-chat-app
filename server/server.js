const config = require("./config.js");
const app = require("./app");
const socket = require("socket.io");

const server = app.listen(config.PORT, () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});

const io = socket(server);
