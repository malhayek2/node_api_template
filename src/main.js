const http = require('http');
const express = require('express');
require('./util/logger')();
const logUtil = require('./util/logUtil');

const resources = require('./resources');
const appConfig = require('./middleware/appConfig');


function onError(server, port) {
  return function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

function onListening(server) {
  return function () {
    console.log(logUtil.currentTime() + ' Listening on port ' + server.address().port);
  }
}

function createHttpServer(app, port, host) {
  const server = http.createServer(app);
  server.listen(port, host);
  server.on('error', onError(server, port));
  server.on('listening', onListening(server));
  return server;
}

function createServer() {
  const serverConfig = resources.getServerConfig();
  const app = express();
  appConfig.config(app);

  if (serverConfig.httpEnabled) {
    createHttpServer(app, serverConfig.httpPort, serverConfig.httpHost);
  }
}

createServer();