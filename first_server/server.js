const express = require('express');
const pm2 = require('./pm2_control');
const app = express();
const port = 3000;


app.get('/startSecond', (req, res) => {
  pm2.startServerTwo();
  res.send('Second server listening on port 3001...');
});

app.get('/startThird', (req,res) => {
  pm2.startServerThree();
  res.send('Third server listening on port 3002...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});