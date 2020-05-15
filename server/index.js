const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const request = require('request');
var cors = require('cors');

app.use(express.static('public/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/github/api:searchTerm', (req, res) => {
  let searchTerm = req.params.searchTerm;
  request(
    `https://jobs.github.com/positions.json?search=${searchTerm}`,
    (error, response, body) => {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      if (error) {
        console.error(error);
      } else {
        res.status(200).send(body);
      }
    }
  );
});

app.listen(port, () =>
  console.log(`Job Searcher Component listening on port ${port}!`)
);
