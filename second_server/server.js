const express = require('express');
const app = express();
const port = 3001;


app.get('/', (req, res) => {
  res.send('Second server GET response.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});