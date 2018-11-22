const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


var app = express();
const port = process.env.PORT || 3004;

const publicPath = path.join(__dirname, '/../public');


app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
// app.get('/', (req,res) => {
//   res.sendFile(publicPath);
  
//   // res.send(req.user);
// });

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'What is going on',
  //   createdAt: 123
  // });

  socket.emit('newMessage', {
    from: 'jon@blah.co',
    text: 'They rise at dawn',
    createdAt: 666
  });

  // socket.on('createEmail', (newEmail)=>{
  //   console.log('create email', newEmail);
  // });

  socket.on('createMessage', (newMessage) =>{
    console.log(newMessage);
    socket.emit('newMessage', {
      from: newMessage.email,
      text: newMessage.text,
      createdAt: 777
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });
});




server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});