const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const helmet = require("helmet");

const bodyParser = require("body-parser");
const app = express();

var whitelist = ["https://tonydc1997.github.io/"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.cookie("session", "1", {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
  res.set({
    "Content-Security-Policy": "'script-src', 'self' 'https://apis.google.com'",
  });
  res.send("Hello World!");
});

app.post("/secret", (req, res) => {
  const { userInput } = req.body;
  winston.log(userInput);
  if (userInput) {
    winston.log("info", "user input: " + userInput);
    res.status(200).json("success");
  } else {
    winston.error("Something may have gone wrong: " + userInput);
    res.status(400).json("incorrect submission");
  }
});

app.listen(3000, () => console.log("Example app listening on port 3000"));
