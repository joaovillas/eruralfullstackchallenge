import express from 'express';
import http from 'http';
import * as sockIo from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = sockIo.listen(httpServer);

io.on('connection', (socket) => {

  socket.on('join', data => {
    const { room, user } = data;

    socket.emit('message', { message: `Bem vindo a sala ${user}`, user, socket_id: socket.id, created_at: Math.floor(Date.now() / 1000) })
    io.to(room).emit({ message: `${user} entrou na sala`, user: `Bot da sala [${room}]`, socket_id: socket.id, created_at: Math.floor(Date.now() / 1000) });
    socket.join(room);

  });

  socket.emit('socketid', { socket_id: socket.id });

  socket.on('message', data => {
    const { room, message, user } = data;
    socket.to(room).emit('message', { message, user, socket_id: socket.id, created_at: Math.floor(Date.now() / 1000) });
  });

  socket.on('sendMessage', (data) => {
    const { user, message, room } = data;

    io.to(room).emit('message', { message, user, socket_id: socket.id, created_at: Math.floor(Date.now() / 1000) })
  });

});

httpServer.listen(4000, () => {
  console.log('listening on *:4000');
});