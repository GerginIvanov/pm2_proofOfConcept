const express = require('express');
const app = express();
const port = 3000;
const server = require('http').Server(app);

const pm2 = require('pm2');
const pm2_base_control = require('./pm2_base_control');
const pm2_second_server_control = require('../second_server/pm2_second_server_control');
const pm2_third_server_control = require('../third_server/pm2_third_server_control');

const WebSocket = require('ws');
const url = require('url');
const wss_outLogs = new WebSocket.Server({ noServer: true });
const wss_errorLogs = new WebSocket.Server({ noServer: true });


wss_outLogs.on('connection', ws => {
  console.log('Client has connected!');
  pm2_base_control.getBaseLogs(ws);
});

wss_errorLogs.on('connection', ws => {
  console.log('Client has connected!');
  pm2_base_control.getErrorLogs(ws);
});

server.on('upgrade', upgrade = (request, socket, head) => {
  const pathname = url.parse(request.url);

  if (pathname.pathname === '/outLogs') {
    wss_outLogs.handleUpgrade(request, socket, head, function done(ws) {
      wss_outLogs.emit('connection', ws, request);
    });
  } else if (pathname.pathname === '/errorLogs') {
    wss_errorLogs.handleUpgrade(request, socket, head, function done(ws) {
      wss_errorLogs.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }

});

app.get('/monitor', (req, res) => {
  pm2.connect((err) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    pm2.describe('base_server', (err, data) => {
      if(err){
        console.log(err);
      }
      res.send(data);
    });
  });


});

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