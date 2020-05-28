const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

const app = express();

app.use(morgan("tiny")); //looogssss
app.use(bodyParser.json()); //parsing body of post/put(anything that has a body)
app.use(cors()); //enabling cors


