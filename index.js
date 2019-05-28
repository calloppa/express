const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));

//api test
app.get("/hi",(request,response) => {
	response.send("Hello world!");
});

//this last line is required by zeit since we are stateless
module.exports = app;