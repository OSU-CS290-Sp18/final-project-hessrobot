/* This file will handle all interactions with the page including creating and sending post requests */

//TODO List (For Jason and LK)
/*
* Make search bar work on the top (Make sure that if filters are on it deletes the ones that don't fit the filter also.)
 * Add event to the DOM when it is created.
 * Add Coordinates for IM Field (ask Reese).
 * Error Check and make sure all dots have correct coordinates set up.
 * Delete single event page function from server.js if not gonna use
 *
 * Extra ideas:
 * Add a delete button and delete functionality
 * Add password support for editing/deleting events
 * Add a single event page (with comments)
 */

//Phill can do all the extra stuff so ask him if you want but hes probably to lazy to actually do it himself cus diminishing returns.
//Reference assignment 3 and 5.1 as you are basically just doing a little more complex version of both.

var new_event = 1;
var id = 0;
//**************************Event "DataBase"*********************
var events = document.getElementsByClassName("in-event");
var allEvents = [];
for(var i=0;i<events.length; i++){
	allEvents.push(events[i]);
}
//************************************************
//Open modal for making new events.
function openModal(){
	var backdrop = document.getElementById("modal-backdrop"); //Show backdrop
	var modal = document.getElementById("create-modal");
	backdrop.classList.remove("hidden");
	modal.classList.remove("hidden");

	var time = document.getElementById("event-time-input"); //Set empty
	var type = document.getElementById("event-type-input");
	time.value = '';
	type.value = '';
	new_event = 1; //This ones for making new events
}

//Open modal for modifiying events
function openModalEdit(event){
	var backdrop = document.getElementById("modal-backdrop"); //Show modal
	var modal = document.getElementById("create-modal");
	backdrop.classList.remove("hidden");
	modal.classList.remove("hidden");

	var modal = document.getElementById("create-modal"); //Get to the inputs
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var type = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var capacity = document.getElementById("event-capacity-input");
	var type = document.getElementById("event-type-input");

	let targetNode = event.currentTarget; //Get some nodes
	let titleNode = targetNode.nextSibling.nextSibling;
	let contentNode = titleNode.nextSibling.nextSibling;
	let parentNode = targetNode.parentNode;
	let testNode = parentNode.previousSibling.previousSibling;

	let locationNode = contentNode.querySelector(".location-input"); //Get to the current value
	let timeNode = contentNode.querySelector(".Time-input");
	let capacityNode = contentNode.querySelector(".capacity-input");
	let typeNode = contentNode.querySelector(".Event-Type");
	let descriptionNode = contentNode.querySelector(".event-text");
	let idNode = contentNode.querySelector(".id");

	title.value = titleNode.textContent; //Make starting input value the current value
	description.value = descriptionNode.textContent;
	locations.value = locationNode.textContent;
	time.value = timeNode.textContent;
	type.value = typeNode.textContent;
	capacity.value = capacityNode.textContent;

	id = idNode.textContent; //Set ID so we know which object were changing and we know that were modifying instead of creating
	new_event = 0;
}

function closeModal(){
	var backdrop = document.getElementById("modal-backdrop"); //Set everything to empty and close everything
	var modal = document.getElementById("create-modal");
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var type = document.getElementById("event-type-input");
	var capacity = document.getElementById("event-capacity-input");
	title.value = '';
	description.value = '';
	capacity.value = '';
	locations.value = '';
	time.value = '';
	type.value = '';
	backdrop.classList.add("hidden");
	modal.classList.add("hidden");
}
//button functionality
function display(sideWord,mapWord){
	var currNumEvents = document.getElementsByClassName("in-event");
	var container = document.getElementsByClassName("event-container")[0];
	var loop = currNumEvents.length;
	for(var i=0; i<loop;i++){
		document.getElementsByClassName("in-event")[0].remove();
	}

	for(var i=0; i<allEvents.length; i++){
		var sideFilterWord = allEvents[i].getElementsByClassName("Event-Type")[0].textContent;
		mapFilterWord = allEvents[i].getElementsByClassName("location-input")[0].textContent;
		console.log("comparing",sideFilterWord, "and", sideWord);
		console.log("comparing",mapFilterWord, "and", mapWord);
		if(sideFilterWord.indexOf(sideWord) >= 0 && mapFilterWord.indexOf(mapWord) >= 0){
			container.appendChild(allEvents[i]);
		}
	}
}

function filter(){
	var side = document.getElementsByClassName("side-item");
	var map = document.getElementsByClassName("marker");
	var sideWord = "";
	var mapWord = "";
	for(var i=0; i<6; i++){
		console.log(side[i].nextSibling.nextSibling.classList);
		if(side[i].nextSibling.nextSibling.classList.contains("active")){
			sideWord = side[i].textContent;
			console.log("FIRST LOOP:", sideWord);
		}
	}
	for(var i=0; i<map.length; i++){
		if(map[i].classList.contains("active") && !map[i].classList.contains("disable")){
			mapWord = map[i].classList[1];
			console.log("IN SECOND LOOP: ", mapWord);
		}

	}
	display(sideWord,mapWord);
}

function mapbutton(){
	var buttons = document.getElementsByClassName("marker");
	for(var i=0; i<buttons.length; i++){
		if(buttons[i].classList.contains("active")){
			buttons[i].classList.remove("active");
		}
	}
	this.classList.add("active");
	filter();
}

function checkMapLocations(){
	var map = document.getElementsByClassName("marker");
	var safe = 0;
	for(var i=0; i<map.length; i++){
		for(var j=0; j<events.length; j++){
			if(map[i].classList[1] == events[j].getElementsByClassName("location-input")[0].value){
				safe = 1;
			}
		}
		if(!safe){
			map[i].remove();
		}
		safe = 0;
	}
}
		

function checkValidPost(){
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var capacity = document.getElementById("event-capacity-input");
	var type = document.getElementById("event-type-input");
	var num = parseInt(capacity.value, 10);
	if(title.value=='' || description.value=='' || locations.value=='' || time.value=='' || capacity.value==''){ //Make sure valid
		alert("you must fill out all boxes");
	}
	else if (num < 1){
		alert("you must choose a valid positive capacity");
	}
	else{
		if (new_event == 1)
		{
			var mapLocation = document.getElementsByClassName("marker");
			console.log(mapLocation);
			let postRequest = new XMLHttpRequest(); //We gonna use this thing to make and send post request to server.
			let postURL = "/addEvent"; //This the URL the server needs to make a new event.
			postRequest.open("POST", postURL); //Open the request so we can put shit in it.

			let eventObject = { //Make the object to send
				eventTitle: title.value,
				eventDescription: description.value,
				eventLocation: locations.value,
				eventType: type.value,
				eventCapacity: capacity.value,
				eventTime: time.value
			};

			let requestBody = JSON.stringify(eventObject); //Change formatting
			postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
			postRequest.send(requestBody); //SEND IT!

			var eventObjectClient = {
				eventTitle: title.value,
				eventDescription: description.value,
				eventLocation: locations.value,
				eventType: type.value,
				eventCapacity: capacity.value,
				eventTime: time.value,
				eventGoing: 1,
				eventID: allEvents.length
			};

			var eventHTML = Handlebars.templates.eventCardTemplate(eventObjectClient);
			var num = events.length;
			var container = document.getElementsByClassName("event-container")[0];
			var makeNew = 0;
			container.insertAdjacentHTML("beforeend",eventHTML);
			allEvents.push(events[num]);

			for(var i=0; i<mapLocation.length; i++){
				if(mapLocation[i].classList.contains(locations.value)){
				//do nothing
				}
				else{
					makeNew = 1;
				}
			}
			
			if(makeNew){
					var mapContainer = document.getElementsByClassName("in-events")[0];
					var addClass = locations.value;
					var loc = document.createElement("div");
					loc.classList.add("marker");
					loc.classList.add(addClass);
					mapContainer.appendChild(loc);
					loc.addEventListener("click",mapbutton);
			}
			
			
			console.log(locations.value);	
			console.log("===================")
			console.log("old index:", num, "new index:", events.length);
			console.log(allEvents);
			console.log(events);
			//make event card with id and going
			//add to DOMNM:wq
			//	add to database
			//	length++
			/*
 * 			TODO
 * 			ADD EVENT TO THE DOM
 * 			ADD EVENT LISTENER TO ITS MODIFY BUTTON AND GOING BUTTON
 * 			ALSO ADD DOT IF NEW LOCATION
 * 			DO THE THING
 * 			*/
		}

		else if (new_event == 0)
		{
			let postRequest = new XMLHttpRequest(); //We gonna use this thing to make and send post request to server.
			let postURL = "/editEvent/" + id.toString(); //This the URL the server needs to make a new event.
			console.log(postURL);
			postRequest.open("POST", postURL); //Open the request so we can put shit in it.

			let eventObject = { //Make the object to send
				eventTitle: title.value,
				eventDescription: description.value,
				eventLocation: locations.value,
				eventType: type.value,
				eventCapacity: capacity.value,
				eventTime: time.value
			};
			console.log(time.value);
			let requestBody = JSON.stringify(eventObject); //Change formatting
			postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
			postRequest.send(requestBody); //SEND IT!

			console.log("HEHEHEHAHAHA", allEvents[0].getElementsByClassName("id")[0].textContent,id);
			console.log(time.value);
			for(var i=0; i<allEvents.length;i++){
				console.log("comparing:",allEvents[i].getElementsByClassName("id")[0].textContent,"to", id);
				if(id == allEvents[i].getElementsByClassName('id')[0].textContent){
					console.log("WE GOT A MATCH", time.value, "lval:", allEvents[i].getElementsByClassName("Time-input")[0].textContent);
					allEvents[i].getElementsByClassName("event-title")[0].textContent=title.value;
					allEvents[i].getElementsByClassName("event-description")[0].textContent=description.value;
					allEvents[i].getElementsByClassName("location-input")[0].textContent=locations.value;
					allEvents[i].getElementsByClassName("Time-input")[0].textContent=time.value;
					allEvents[i].getElementsByClassName("capacity-input")[0].textContent=capacity.value;
					allEvents[i].getElementsByClassName("Event-Type")[0].textContent=type.value
				}
			}
		}
		closeModal();
		checkMapLocations();
	}
}

function going(event)
{
	let targetNode = event.currentTarget; //Get some nodes
	targetNode.classList.add("hidden");

	let contentNode = targetNode.previousSibling.previousSibling;
	let capacityNode = contentNode.querySelector(".capacity-input");
	let idNode = contentNode.querySelector(".id");
	let goingNode = contentNode.querySelector(".attending-input");

	id = idNode.textContent; //Set ID so we know which object were changing
	let going = parseInt(goingNode.textContent,10);
	let cap = parseInt(capacityNode.textContent,10);

	if (going === cap)
	{
		alert("Event is at maximum capacity");
	}
	else
	{
			let newGoing = going + 1;
			goingNode.textContent = newGoing.toString();
			let postRequest = new XMLHttpRequest(); //We gonna use this thing to make and send post request to server.
			let postURL = "/goingToEvent/" + id.toString(); //This the URL the server needs to make a new event.
			console.log(postURL);
			postRequest.open("POST", postURL); //Open the request so we can put shit in it.

			let eventObject = { //Make the object to send
				eventGoing: newGoing
			};

			let requestBody = JSON.stringify(eventObject); //Change formatting
			postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
			postRequest.send(requestBody); //SEND IT!
	}
}

function display(sideWord,mapWord){
	var currNumEvents = document.getElementsByClassName("in-event");
	var container = document.getElementsByClassName("event-container")[0];
	var loop = currNumEvents.length;
	for(var i=0; i<loop;i++){
		document.getElementsByClassName("in-event")[0].remove();
	}

	for(var i=0; i<allEvents.length; i++){
		console.log(allEvents.length);
		var sideFilterWord = allEvents[i].getElementsByClassName("Event-Type")[0].textContent;
		mapFilterWord = allEvents[i].getElementsByClassName("location-input")[0].textContent;
		console.log("comparing",sideFilterWord, "and", sideWord);
		console.log("comparing",mapFilterWord, "and", mapWord);
		if(sideFilterWord.indexOf(sideWord) >= 0 && mapFilterWord.indexOf(mapWord) >= 0){
			container.appendChild(allEvents[i]);
		}
	}
}

function filter(){
	var side = document.getElementsByClassName("side-item");
	var map = document.getElementsByClassName("marker");
	var sideWord = "";
	var mapWord = "";
	for(var i=0; i<6; i++){
		console.log(side[i].nextSibling.nextSibling.classList);
		if(side[i].nextSibling.nextSibling.classList.contains("active")){
			sideWord = side[i].textContent;
			console.log("FIRST LOOP:", sideWord);
		}
	}
	for(var i=0; i<map.length; i++){
		if(map[i].classList.contains("active") && !map[i].classList.contains("disable")){
			mapWord = map[i].classList[1];
			console.log("IN SECOND LOOP: ", mapWord);
		}

	}
	display(sideWord,mapWord);

}


function mapbutton(){
	var buttons = document.getElementsByClassName("marker");
	for(var i=0; i<buttons.length; i++){
		if(buttons[i].classList.contains("active")){
			buttons[i].classList.remove("active");
		}
	}
	this.classList.add("active");
	filter();
}

function sidebutton(){
	var clear = document.getElementsByClassName("side-bar-button");
	var string = "active";
	for(var i=0; i<6; i++){
		if(clear[i].classList.contains(string)){
			clear[i].classList.remove("active");
		}
	}
	this.classList.add("active");
	filter();
}

function displayAllEvents(){
	var container = document.getElementsByClassName("event-container")[0];
	var loopAll = allEvents.length;
	var loopCur = document.getElementsByClassName("in-event").length;
	var clear = document.getElementsByClassName("side-bar-button");
	var mapButtons = document.getElementsByClassName("marker");
	document.getElementById("navbar-search-input").value = null;

	for(var i=0; i<mapButtons.length; i++){
		if(mapButtons[i].classList.contains("active")){
			mapButtons[i].classList.remove("active");
		}
	}
	for(var i=0; i<6; i++){
		if(clear[i].classList.contains("active")){
			clear[i].classList.remove("active");
		}
	}
	for(var i=0; i<loopCur;i++){
		document.getElementsByClassName("in-event")[0].remove();
	}
	for(var i=0; i<loopAll;i++){
		console.log(typeof(allEvents[i]))
		container.appendChild((allEvents[i]));
	}
}
//Filter buttons
var sport = document.getElementById("sports-button");
var food = document.getElementById("food-button");
var study = document.getElementById("study-button");
var chill = document.getElementById("chill-button");
var party = document.getElementById("party-button");
var other = document.getElementById("other-button");
var clear = document.getElementsByClassName("clear")[0];
//end of filer buttons

//Search Bar
var searchBar = document.getElementById("navbar-search-input");

//function searchFilter(){

var makeEvent = document.getElementsByClassName("modal-accept-button")[0];
var postModalButton = document.getElementById("create-event-button");
var closeModalButton = document.getElementsByClassName("modal-close-button")[0];
var editButton = document.getElementsByClassName("edit-icon");
var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];

//map buttons
var gill = document.getElementsByClassName("marker");

for(var i=0;i<gill.length;i++){
	gill[i].addEventListener("click", mapbutton)
}

sport.addEventListener("click",sidebutton);
food.addEventListener("click",sidebutton);
study.addEventListener("click",sidebutton);
chill.addEventListener("click",sidebutton);
party.addEventListener("click",sidebutton);
other.addEventListener("click",sidebutton);
clear.addEventListener("click",function(){
	window.location.reload();
});

//clear.addEventListener(document.location.reload());


var editButton = document.getElementsByClassName("edit-icon");
var goingButton = document.getElementsByClassName("go-btn");
cancelButton.addEventListener("click",closeModal);
closeModalButton.addEventListener("click",closeModal);
postModalButton.addEventListener("click",openModal);
makeEvent.addEventListener("click",checkValidPost);

//Add to all event buttons, not just one
for (let i = 0; i < editButton.length; i++)
	editButton[i].addEventListener("click",openModalEdit);

for (let i = 0; i < goingButton.length; i++)
	goingButton[i].addEventListener("click",going);





// Search Bar
	window.onload = function () {
	  var eventsCash = [];
	  var text = document.getElementsByClassName("in-event");
	  var tmp = document.getElementsByClassName("event-container");
	  var evContainer = tmp[0];
	  tmp = null;

	  var inputs = document.getElementsByTagName('input');

		//var clear = document.getElementsByClassName("clear")[0];
		//clear.addEventListener("click",displayAllEvents);

	  var whiteList = [];
	  eventsCash.length = 0;
	  var change = '';


	  for (i = 0; i < inputs.length; i++) {
	      inputs[i].onkeyup = function() {


				console.log(eventsCash);
	      p1 = document.getElementById("navbar-search-input").value;


	      whiteList.length = 0;

	      for (var i = 0; i < eventsCash.length; i++) {
	        evContainer.appendChild(eventsCash[i]);
	        console.log(eventsCash[i]);
	      }
	      eventsCash.length = 0;

	      allEvents = document.getElementsByClassName("in-event");

	      for(i = 0; i < allEvents.length; i++){
	        if(allEvents[i].textContent.includes(p1)){

	          whiteList.push(allEvents[i]);
	        }
	      }


	      while(allEvents.length > whiteList.length){
	        for(i = 0; i < allEvents.length; i++){
	          if(!whiteList.includes(allEvents[i])){
	            eventsCash.push(allEvents[i]);
	            evContainer.removeChild(allEvents[i]);
	          }

	        }
	      }

					//for(i = 0; i < whiteList.length; i++){
						//allEvents.push(whiteList[i]);
				//	}
					//displayAllEvents();

	    };
	  }
	};
