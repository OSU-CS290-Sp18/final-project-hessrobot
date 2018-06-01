var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = "mongodb://" + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(express.static("public"));


var length = 0;

app.get('/', function(req, res){
	let eventDataCollection = db.collection("eventData");
	eventDataCollection.find({}).toArray(function (err, results) {
		if (err)
		{
			res.status(500).send("Server side error.");
		}
		else
		{
			let num = results.length;
			res.status(200).render('homePage', {events: results, numEvents: num});
		}
	});
});

app.get("/:eventID", function (req, res, next){
	let eventDataCollection = db.collection("eventData");
	eventDataCollection.find({ eventID: req.params.eventID}).toArray(function (err, results){
		if (err)
		{
			res.status(500).send("Error fetching event");
		}
		else if (results.length > 0)
		{
			res.status(200).render('eventPage', results[0]);
		}
		else
		{
			next();
		}
	});
});

app.get('*', function(req,res){
	res.status(404).render("404", {numEvents: 0});
});

//Needs all six in body.
app.post("/addEvent", function (req, res, next){
	if (req.body)
	{
		let eventDataCollection = db.collection("eventData");
		eventDataCollection.find({}).toArray(function (err, results){
			if (err)
			{
				res.status(500).send("Error in database");
			}
			length = results.length;
			let eventObject = {
				eventTitle: req.body.eventTitle,
				eventDescription: req.body.eventDescription,
				eventLocation: req.body.eventLocation,
				eventTime: req.body.eventTime,
				eventCapacity: req.body.eventCapacity,
				eventType: req.body.eventType,
				eventGoing: 0,
				eventId: length
			};
			let eventDataCollection = db.collection("eventData");
			eventDataCollection.insertOne(eventObject, function(err, result) {
				if (err){
					res.status(500).send("Error inserting to DB");
				}
				else
				{
					res.status(200).send("Success");
				}
			});
		});
	}
	else
	{
		next();
	}
});

//Needs everything in body all six.
app.post("editEvent/:eventID", function(req, res, next) {
	if (req.body)
	{
		let eventDataCollection = db.collection("eventData");
		eventDataCollection.find({}).toArray(function (err, results){
			if (err)
			{
				res.status(500).send("Error in database");
			}
			length = results.length;
			let eventDataCollection = db.collection("eventData");
			let id = req.params.eventID;
			if (length >= id || id < 0)
			{
				next();
			}
			eventDataCollection.updateOne(
				{ eventID: id },
				{ $push: {  
					eventTitle: req.body.eventTitle,
					eventDescription: req.body.eventDescription,
					eventLocation: req.body.eventLocation,
					eventTime: req.body.eventTime,
					eventCapacity: req.body.eventCapacity,
					eventType: req.body.eventType,
				}},
				function (err, result) {
					if (err)
					{
						res.status(500).send("Error fetching from DB");
					}
					else
					{
						res.status(200).send("Success");
					}
				});
		});
	}
	else
	{
		res.status(400).send("Body needs to be filled out");
	}
});

//Doesn't need anything in body as of now.
app.post("goingToEvent/:eventID", function(req, res, next) {
	let eventDataCollection = db.collection("eventData");
	eventDataCollection.find({}).toArray(function (err, results){
		if (err)
		{
			res.status(500).send("Error in database");
		}
		length = results.length;
		let eventDataCollection = db.collection("eventData");
		let id = req.params.eventID;
		if (length >= id || id < 0)
		{
			next();
		}
		let newGoing = results[id].eventGoing + 1; //Alternative is to have client write new going number to req body.
		eventDataCollection.updateOne(
			{ eventID: id },
			{ $push: {  
				eventGoing: newGoing,
			}},
			function (err, result) {
				if (err)
				{
					res.status(500).send("Error fetching from DB");
				}
				else
				{
					res.status(200).send("Success");
				}
			});
	});
});

app.post('*', function(req,res){
	res.status(404).send("Attempting to POST to unknown path.");
});

//Add what happens when an event is deleted.
//Add thing to catch non-exsisting delete requests.

MongoClient.connect(mongoURL, function(err,connection){
	if (err)
	{
		throw err;
	}
	mongoConnection = connection;
	db = connection.db();
	app.listen(port,function(){
		console.log("Server Listening on port: ", port);
	});
});
