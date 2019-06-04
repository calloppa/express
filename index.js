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

const CONNECTION_URL = "mongodb+srv://calloppa:<hyt19980519***>@tiffanylab10-awd1d.mongodb.net/test?retryWrites=true";
const DATABASE_ NAME = "TiffanyLab10" ;
//save a new note
app.post("/notes", (request, response) => {

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true ], (error, client) => {
		if(error) {
					response.send(error);
					throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Notes");

		collection.insert(request.body,(error,result) => {
			if(error) {
						return response.status(500).send(error);
			}
			response.send(result.result);
		}); 
	});
});  
//we will use the following template for notes: '{"name":"", " body":""}'

//this last line is required by zeit since we are stateless
module.exports = app;

//get all notes
app.get("/notes", (request, response) => {

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
	if(error) {
				response.send(error);
				throw error;
	}
	database = client.db(DATABASE_NAME);
	collection = database.collection("Notes");

	collection.find({}).toArray((error,result) => {
	if(error){
					return response.status(500).send(error);
	}
	response.send(result);
		});
	}); 
});

//get a single note
app.get("/notes/:id",(request,response) => {
	
	MongoClient.connect(CONNECTION_URL, { useNewUrlParser:true},(error,client) => {
	if(error) {
		response.send(error);
		throw error;
	}
	database = client.db(DATABASE_NAME);
	collection = database.collection("Notes");

	collection.find({}).toArray((error, result) => {
	if(error){
		return response.status(500).send(error);
	}

	//parse the request into a number
	var numberID = parseInt (request.params.id); 

	//only return a response if it is valid
	if (numberID >= result.length)
		response.send("Not enough elements in database")
	else
		response.send(result[numberID]);
		});
	});
});
