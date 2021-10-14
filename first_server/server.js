const express = require('express');
const pm2_base_control = require('./pm2_base_control');
const pm2_second_server_control = require('../second_server/pm2_second_server_control');
const pm2_third_server_control = require('../third_server/pm2_third_server_control');
const app = express();
const port = 3000;

// pm2_base_control.getBaseLogs()
// .then(result => {
//   res.send(result);
//   res.end();
// });

app.get('/logs', (req, res) => {
  console.log(pm2_base_control.getBaseLogs());
  res.end();
});



app.get('/startSecond', (req, res) => {
  pm2_second_server_control.startServerTwo();
  res.send('Second server listening on port 3001...');
});

app.get('/stopSecond', (req, res) => {
  pm2_second_server_control.stopServerTwo();
  res.send('Second server has stopped.');
});

app.get('/restartSecond', (req, res) => {
  pm2_second_server_control.restartServerTwo();
  res.send("Server two has been restarted.");
});




app.get('/startThird', (req, res) => {
  pm2_third_server_control.startServerThree();
  res.send('Third server listening on port 3002...');
});

app.get('/stopThird', (req, res) => {
  pm2_third_server_control.stopServerThree();
  res.send('Third server has stopped.');
});

app.get('/restartThird', (req, res) => {
  pm2_third_server_control.restartServerThree();
  res.send("Server three has been restarted.");
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});