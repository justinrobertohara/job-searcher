const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(express.static('public/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () =>
  console.log(`Job Searcher Component listening on port ${port}!`)
);
