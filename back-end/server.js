
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// connect to the mongodb database - decide on a new database-name
mongoose.connect('mongodb://localhost:27017/questionaires', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// listen on port 3002
app.listen(3002, () => console.log('Server listening on port 3002!'));
