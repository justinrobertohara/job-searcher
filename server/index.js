const express = require('express');
const app = express();
const port = 3000;
// const port = process.env.PORT || 3000;
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

app.post('/saveListing/api', (req, res) => {
  let saveListing = {
    type: req.body.data.type,
    title: req.body.data.title,
    company: req.body.data.company,
    company_logo: req.body.data.company_logo,
    location: req.body.data.location,
    how_to_apply: req.body.data.how_to_apply,
    description: req.body.data.description,
  };

  // if (error) {
  //   res.status(404).send(error);
  // } else {
  res.status(200).send(saveListing);
  // }
});

app.listen(port, () =>
  console.log(`Job Searcher Component listening on port ${port}!`)
);
