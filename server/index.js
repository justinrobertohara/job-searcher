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

app.post('/github/api', (req, res) => {
  let searchTerm = req.body.data.searchTerm;
  let location = req.body.data.location;
  let fullTime = req.body.data.fullTime;

  console.log(fullTime);

  request(
    `https://jobs.github.com/positions.json?search=${searchTerm}&location=${location}&full_time=${fullTime}`,
    (error, response, body) => {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(body);
      }
    }
  );
});

app.listen(port, () =>
  console.log(`Job Searcher Component listening on port ${port}!`)
);
