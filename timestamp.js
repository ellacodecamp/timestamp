"use strict";

var express = require("express");

var app = express();
require("dotenv").load();

var path = process.cwd();
app.use(express.static(path + "/public"));

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getDateString(date) {
  return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

app.get("/((\\d+))", function(req, res) {
  var dateNumber = Number(req.params[0]);
  var date = new Date(dateNumber);
  var ret = {
    "unix": null,
    "natural": null
  };

  if (date.toString() != "Invalid Date") {
    ret.unix = req.params[0];
    ret.natural = getDateString(date);
  }
  res.end(JSON.stringify(ret));
});

app.get("/:id", function(req, res) {
  var ret = {
    "unix": null,
    "natural": null
  };
  var date = new Date(req.params.id);
  if (date.toString() != "Invalid Date") {
    ret.unix = date.getTime();
    ret.natural = getDateString(date);
  }
  res.end(JSON.stringify(ret));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log("Node.js listening on port " + port + "...");
});