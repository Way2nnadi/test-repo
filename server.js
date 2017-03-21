'use strict';

let express = require('express');
let server = express();  


server.get('/', (req, res) => {
  console.log(req.body)
  res.send('ok');
})

server.get('/receive/github', (req, res) => {
  console.log(req.body)
  res.send('ok');
})

server.listen(4000, () => {
  console.log('Listening on Port:' + 4000);

})