//Set up mongo and handlebars
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

//Display page of events with dots on map
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
			let i = 0;
			let showMU = 0;
			let showSEC = 0;
			let showLibrary = 0;
			let showDixon = 0;
			let showReeser = 0;
			let showKEC = 0;
			let showMcNary = 0;
			let showWest = 0;
			let showArnold = 0;
			let showBings = 0;
			let showIM = 0;
			let showGill = 0;
			for (i = 0; i < num; i++)
			{
				if (results[i].eventLocation == "MU")
					showMU = 1;
				if (results[i].eventLocation == "Library")
					showLibrary = 1;
				if (results[i].eventLocation == "SEC")
					showSEC = 1;
				if (results[i].eventLocation == "KEC")
					showKEC = 1;
				if (results[i].eventLocation == "Mcnary Dinning")
					showMcNary = 1;
				if (results[i].eventLocation == "West Dinning")
					showWest = 1;
				if (results[i].eventLocation == "Arnold Dinning")
					showArnold = 1;
				if (results[i].eventLocation == "Bings")
					showBings = 1;
				if (results[i].eventLocation == "IM Fields")
					showIM = 1;
				if (results[i].eventLocation == "Dixon")
					showDixon = 1;
				if (results[i].eventLocation == "Reeser")
					showReeser = 1;
				if (results[i].eventLocation == "Gill")
					showGill = 1;
			}
			res.status(200).render('homePage', {events: results, numEvents: num, showCreateEvent: 1,
				showMU: showMU, showLibrary: showLibrary, showSEC: showSEC, showKEC: showKEC, 
				showMcNary: showMcNary, showWest: showWest, showArnold: showArnold, showBings: showBings, 
				showIM: showIM, showDixon: showDixon, showReeser: showReeser, showGill: showGill
			});
		}
	});
});

//Event page currently not set to do anything.  Do we even want to include this?
app.get("/eventPage/:eventID", function (req, res, next){
	let eventDataCollection = db.collection("eventData");
	let ID = parseInt(req.params.eventID, 10);
	eventDataCollection.find({eventID: ID}).toArray(function (err, results){
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

//Danger zone.  Not for final product, for testing
app.get("/wipe/confirm", function (req, res, next){
	let eventDataCollection = db.collection("eventData");
	eventDataCollection.deleteMany({});
	console.log("Database wiped.");
});

//404 LK's lover not found
app.get('*', function(req,res){
	res.status(404).render("404", {numEvents: 0});
});

//Add a new event. 
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
				eventGoing: 1,
				eventID: length
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

//Edit an exsisting event.
app.post("/editEvent/:eventID", function(req, res, next) {
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
			let id = parseInt(req.params.eventID,10);
			if (length >= id || id < 0)
			{
				next();
			}
			eventDataCollection.updateOne(
				{ eventID: id },
				{ $set:{   
					eventTitle: req.body.eventTitle,
					eventDescription: req.body.eventDescription,
					eventLocation: req.body.eventLocation,
					eventTime: req.body.eventTime,
					eventCapacity: req.body.eventCapacity,
					eventType: req.body.eventType
				}},
				function (err, result) {
					if (err)
					{
						console.log(err);
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
app.post("/goingToEvent/:eventID", function(req, res, next) {
	let eventDataCollection = db.collection("eventData");
	eventDataCollection.find({}).toArray(function (err, results){
		if (err)
		{
			res.status(500).send("Error in database");
		}
		length = results.length;
		let eventDataCollection = db.collection("eventData");
		let id = parseInt(req.params.eventID,10);
		if (length >= id || id < 0)
		{
			next();
		}
		let newGoing = results[id].eventGoing + 1; //Alternative is to have client write new going number to req body.
		console.log("newGoing: ", newGoing);
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
