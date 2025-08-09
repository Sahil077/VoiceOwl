//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const datacontroller = require("./datacontroller/controller");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(express.static("public"));


datacontroller(app);



app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server running on port 3000.!");
});