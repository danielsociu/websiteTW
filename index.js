const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const fs = require("fs");

const app = express();

app.use(morgan("tiny")); //looogssss
app.use(bodyParser.json()); //parsing body of post/put(anything that has a body) this :doesn't work?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); //enabling cors

app.route('/comments').post(function (req, res) {
  var obj = { "comments": {} };
  //fs.accessSync("data.json",function(err){
  if (fs.existsSync("data.json")) {
    var newData = req.body;
    newData.id = uuidv4();
    newData.date = new Date();
    obj = fs.readFileSync("data.json");
    obj = JSON.parse(obj);
    obj.comments[newData.id] = newData;
    let result = JSON.stringify(obj, undefined, 2);
    fs.writeFileSync("data.json", result);
    // fs.readFile("data.json",function(err,content){
    //   if(err)
    //     console.log(err);
    //   else{
    //     var newData = req.body;
    //     newData.id = uuidv4();
    //     newData.date = new Date();

    //     var obj = JSON.parse(content);
    //     obj.comments.push(newData);
    //     let result = JSON.stringify(obj,undefined,2);
    //     fs.writeFileSync("data.json",result);
    //   }
    // });
  } else {
    console.log("File doesn't exist, creating it");
    newData = req.body;
    newData.id = uuidv4();
    newData.date = new Date();
    obj.comments[newData.id] = newData;
    let result = JSON.stringify(obj, undefined, 2);
    fs.writeFileSync("data.json", result);
  }
  res.send(obj);
  //});
}).get(function (req, res) {
  var obj = { "comments": {} };
  if (fs.existsSync("data.json")) {
    obj = fs.readFileSync("data.json");
    obj = JSON.parse(obj);
  }
  obj = JSON.stringify(obj, undefined, 2);
  res.send(obj);
}).delete(function (req, res) {
  var id = req.body.who;
  var obj = { "comments": {} };
  if (fs.existsSync("data.json")) {
    obj = fs.readFileSync("data.json");
    obj = JSON.parse(obj);
    if (id in obj.comments)
      delete obj.comments[id];
    let result = JSON.stringify(obj, undefined, 2);
    fs.writeFileSync("data.json", result);
  }
  res.send(obj);
}).put(function(req,res){
  var obj = { "comments": {} };
  var id = req.body.who;
  var newMsj = req.body.newMessage;
  if(fs.existsSync("data.json")){
    obj = fs.readFileSync("data.json");
    obj = JSON.parse(obj);
    if (id in obj.comments)
      obj.comments[id].message = newMsj;
    let result = JSON.stringify(obj, undefined, 2);
    fs.writeFileSync("data.json", result);
  }
  res.send(obj);
});
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);

