const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(__dirname + '/public/index.html');
});

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

io.on('connection', (socket) => {
  socket.on('button', (data) => {
    io.emit('button', data);
  })
  socket.on('reset', (data) => {
    io.emit('reset', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});