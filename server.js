const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');

const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req,res) => res.send('Hello World!'));

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  winston.log(userInput);
  if(userInput) {
    res.status(200).json('success');
  } else {
    res.status(400).json('incorrect submission');
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000'));
