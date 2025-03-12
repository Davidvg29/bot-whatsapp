require('dotenv').config();

const ngrok = require('@ngrok/ngrok');

const http = require("http");

const router = require("./routes/routes")

const server = http.createServer(router);

const PORT = 3001;
const HOSTNAME = "localhost";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor corriendo en http://${HOSTNAME}:${PORT}/`);
});