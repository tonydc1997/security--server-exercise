const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Hello World!'));

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  console.log(req.body);
});
