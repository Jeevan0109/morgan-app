//: npm init -y, npm i nodemon,express morgan uuid
const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const path = require("path");

// assing express app to app variable
const app = express();
const port = process.env.PORT || 3000;

//creating token
morgan.token("id", function getID(req) {
  return req.id;
});

//creating new token
morgan.token("param", function (req, res, param) {
  return "userToken";
});

app.use(assignID);

//assign the all morgan key on file
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan(':id:param:method:status:url"HTTP/:http-version"'));

app.use(
  morgan(':id:param:method:status:url"HTTP/:http-version"', {
    stream: accessLogStream,
  })
);

//param
app.use(morgan(':id:param:method:status:url"HTTP/:http-version"'));

app.get("/", (req, res) => {
  res.end("Morgan Logger App");
});

//creating unqie id in that file
//function
function assignID(req, res, next) {
  req.id = uuidv4();
  next();
}

//app listening
app.listen(port, () => {
  console.log(`Server running ON  http://localhost:${port}`);
});
