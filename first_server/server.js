const express = require('express');
const pm2_second_server_control = require('../second_server/pm2_second_server_control');
const pm2_third_server_control = require('../third_server/pm2_third_server_control');
const app = express();
const port = 3000;


app.get('/startSecond', (req, res) => {
  pm2_second_server_control.startServerTwo();
  res.send('Second server listening on port 3001...');
});

app.get('/startThird', (req,res) => {
  pm2_third_server_control.startServerThree();
  res.send('Third server listening on port 3002...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});