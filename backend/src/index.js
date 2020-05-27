//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// define the Express app
const app = express();

// the database
// TODO: change to mongoDB later
const candidates = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all candidates
app.get('/', (req, res) => {
  console.log(candidates);
  const qs = candidates.map(q => ({
    id: q.id,
    name: q.name,
    education: q.education,
    contact: q.contact,
    answer: q.answers.answer,
  }));
  res.send(qs);
});

// get a specific candidate
app.get('/:id', (req, res) => {
  const candidate = candidates.filter(q => (q.id === parseInt(req.params.id)));
  if (candidate.length > 1) return res.status(500).send();
  if (candidate.length === 0) return res.status(404).send();
  res.send(candidate[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://siyuanyu1636.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'PEoV5QlRmGfj9Jkvlzb7lFsIpARrOHRT',
  issuer: `https://siyuanyu1636.auth0.com/`,
  algorithms: ['RS256']
});

// insert a new candidate
app.post('/', checkJwt, (req, res) => {
  const {name, education, contact} = req.body;
  const newCandidate = {
    id: candidates.length + 1,
    name,
    education,
    contact,
    answers: [],
    author: req.user.name,
  };
  candidates.push(newCandidate);
  res.status(200).send();
});

// insert a new comment to a candidate
app.post('/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const candidate = candidates.filter(q => (q.id === parseInt(req.params.id)));
  if (candidate.length > 1) return res.status(500).send();
  if (candidate.length === 0) return res.status(404).send();

  candidate[0].answers.push({
    answer,
    author: req.user.name,
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});