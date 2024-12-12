const express = require('express');
const compression = require('compression');
const apis = require('./api');
const cors = require('cors');
const { serverConfig, database } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  compression({
    level: 6,
    threshold: 10 * 100,
  })
);

app.get('/', (req, res) => res.send('AI quote automation backend'));

app.use('/api', apis);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server listening on port : ${serverConfig.PORT}`);
  database.connect();
  console.log('mongoose connected');
});
