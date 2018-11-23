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

  // socket.emit('newMessage', {
  //   from: 'jon@blah.co',
  //   text: 'They rise at dawn',
  //   createdAt: 666
  // });

  // socket.on('createEmail', (newEmail)=>{
  //   console.log('create email', newEmail);
  // });

  //Welcome new user
  socket.emit('newMessage', {
    from: "Admin",
    text: "Welcome To The App",
    createdAt: new Date().getTime()
  });
  //Tell users new person has joined
  socket.broadcast.emit('newMessage',{
    from: "Admin",
    text: "A new user has joined the coven",
    createdAt: new Date().getTime()
  });


  socket.on('createMessage', (newMessage) =>{
    console.log(newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });

    // //Broadcast example.
    // socket.broadcast.emit('newMessage',{
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });
});




server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});