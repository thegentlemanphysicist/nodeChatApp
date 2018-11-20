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

server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});