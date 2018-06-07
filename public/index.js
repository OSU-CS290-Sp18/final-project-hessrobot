/* This file will handle all interactions with the page including creating and sending post requests */

var new_event = 1;
var id = 0;

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
			
			let requestBody = JSON.stringify(eventObject); //Change formatting
			postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
			postRequest.send(requestBody); //SEND IT!
		}

		closeModal();
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


function sidebutton(){
	alert("fuk u");
}

//Filter buttons
var sport = document.getElementById("sports-button");
var food = document.getElementById("food-button");
var study = document.getElementById("study-button");
var chill = document.getElementById("chill-button");
var party = document.getElementById("party-button");
var other = document.getElementById("other-button");
sport.addEventListener("click",sidebutton);
var makeEvent = document.getElementsByClassName("modal-accept-button")[0];
var postModalButton = document.getElementById("create-event-button");
var closeModalButton = document.getElementsByClassName("modal-close-button")[0];

var editButton = document.getElementsByClassName("edit-icon");
var goingButton = document.getElementsByClassName("go-btn");

closeModalButton.addEventListener("click",closeModal);
postModalButton.addEventListener("click",openModal);
makeEvent.addEventListener("click",checkValidPost);

//Add to all event buttons, not just one
for (let i = 0; i < editButton.length; i++)
	editButton[i].addEventListener("click",openModalEdit);

for (let i = 0; i < goingButton.length; i++)
	goingButton[i].addEventListener("click",going);
