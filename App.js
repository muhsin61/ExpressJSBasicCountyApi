let fs = require("fs");
let obj = JSON.parse(fs.readFileSync("country.json", "utf8"));

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to bezkoder application." });
  let findCountry = [];
  if (req.query.name) {
    if (
      obj.find((country) => {
        country.name === req.query.name
          ? (findCountry = country)
          : (findCountry = []);
        return country.name === req.query.name;
      })
    ) {
      res.json(findCountry);
      console.log(findCountry);
    } else {
      res.send("404 not found");
    }
  } else if (req.query.code) {
    if (
      obj.find((country) => {
        country.code === req.query.code
          ? (findCountry = country)
          : (findCountry = []);
        return country.code === req.query.code;
      })
    ) {
      res.json(findCountry);
      console.log(findCountry);
    } else {
      res.send("404 not found");
    }
  } else {
    res.json(obj);
  }
});
app.get("/All", (req, res) => {
  //res.json({ message: "Welcome to bezkoder application." });
  res.json(obj);
});

app.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
