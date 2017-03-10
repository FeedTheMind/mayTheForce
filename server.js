const express = require('express');
const app = express();
const port = 1337;
const router = require('./app/routes');

app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I am listening on port ${port}.`);
});
