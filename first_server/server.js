const express = require('express');
const app = express();
const port = 3000;

const WebSocket = require('ws');
const server = require('http').Server(app);
// const wss = new webSocket.Server({ server });

const pm2_base_control = require('./pm2_base_control');
const pm2_second_server_control = require('../second_server/pm2_second_server_control');
const pm2_third_server_control = require('../third_server/pm2_third_server_control');



//implement a socket here which send a response
//response is sent each time a the function returns something

app.get('/logs', (req, res) => {
  pm2_base_control.getBaseLogs();
  
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

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});