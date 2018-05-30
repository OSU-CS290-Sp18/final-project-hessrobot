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
app.use(express.static('public'));

app.get('/', function(req, res){
	res.status(200).render('homePage');
});

app.get('*', function(req,res){
	res.status(404).render("404");
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
	app.listen(port,function(){
		console.log("Server Listening on port: ", port);
	});
});


