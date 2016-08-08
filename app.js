//initializing enviro variables
require("dotenv").config();

//contants

const PORT = process.env.PORT || 8000;

//requirements
const mysql = require("mysql");
const express = require("express");
const morgan = require ("morgan");
const bodyParser = require("body-parser");
const path = require("path");

//app declaration
const app = express();

//view config
//app.set("view engine", 'ejs');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static("public"));

//ROUTES
// app.get("/", (req, res) => {
//   res.render("index");

// });

app.use("/grades", require("./routes/grades"));

//SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
//HEY PRATIK GUESS WHAT I SUCK