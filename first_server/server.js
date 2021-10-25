const express = require('express');
const app = express();
const port = 3000;
const server = require('http').Server(app);
const WebSocket = require('ws');

const pm2_base_control = require('./pm2_base_control');
const pm2_second_server_control = require('../second_server/pm2_second_server_control');
const pm2_third_server_control = require('../third_server/pm2_third_server_control');

const wss = new WebSocket.Server({ server, path: "/logs" });


wss.on('connection', ws => {
  console.log("New client connected!");


  ws.on('close', () => {
    console.log("Client has disconnected!");
  });
});



//implement a socket here which send a response
//response is sent each time a the function returns something
// app.get('/logs', (req, res) => {
//   // const result = pm2_base_control.getBaseLogs();

  
// });

app.get('/deleteOutLogsBase', (req, res) => {
  pm2_base_control.deleteOutLogs();
  res.send('logs deleted');
});

app.get('/deleteErrorLogsBase', (req, res) => {
  pm2_base_control.deleteErrorLogs();
  res.send('error logs deleted');
});


//second server routes
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

app.get('/deleteOutLogsSecond', (req, res) => {
  pm2_second_server_control.deleteOutLogs();
  res.send('logs deleted');
});

app.get('/deleteErrorLogsSecond', (req, res) => {
  pm2_second_server_control.deleteErrorLogs();
  res.send('logs deleted');
});


//third server routes
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

app.get('/deleteOutLogsThird', (req, res) => {
  pm2_third_server_control.deleteOutLogs();
  res.send('Out logs deleted');
});

app.get('/deleteErrorLogsThird', (req, res) => {
  pm2_third_server_control.deleteErrorLogs();
  res.send('Error logs deleted');
});




server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});