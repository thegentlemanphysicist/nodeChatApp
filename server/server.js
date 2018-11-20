const express = require('express');



var app = express();
const port = process.env.PORT || 3004;
const path = require('path');
const publicPath = path.join(__dirname, '/../public');

app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//   res.sendFile(publicPath);
  
//   // res.send(req.user);
// });

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});