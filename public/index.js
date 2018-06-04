/* This file will handle all interactions with the page including creating and sending post requests */

function openModal(){
	alert("fuck you");
	var backdrop = document.getElementById("modal-backdrop");
	var modal = document.getElementById("create-modal");
	backdrop.classList.remove("hidden");	
	modal.classList.remove("hidden");	
}

function closeModal(){
	var backdrop = document.getElementById("modal-backdrop");
	var modal = document.getElementById("create-modal");
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var capacity = document.getElementById("event-capacity-input");
	title.value = '';
	description.value = '';
	capacity.value = '';
	locations.value = '';
	time.value = '';
	backdrop.classList.add("hidden");	
	modal.classList.add("hidden");	
	console.log("close dat hun");
}

function checkValidPost(){
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var capacity = document.getElementById("event-capacity-input");
	if(title.value=='' || description.value=='' || locations.value=='' || time.value=='' || capacity.value==''){
		alert("you must fill out all boxes");
	}
	else{
		console.log("valid post");
		//example for you nims
		let postRequest = new XMLHttpRequest(); //We gonna use this thing to make and send post request to server.
		let postURL = "/addEvent"; //This the URL the server needs to make a new event.
		postRequest.open("POST", postURL); //Open the request so we can put shit in it.
	
		let eventObject = { //Make the object to send
			eventTitle: title.value,
			eventDescription: description.value,
			eventLocation: locations.value,
			eventType: "Chill", //Temporary since the box is not set up yet
			eventCapacity: capacity.value,
			eventTime: time.value
		};

		let requestBody = JSON.stringify(eventObject); //Change formatting
		postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
		postRequest.send(requestBody); //SEND IT!
	
		closeModal();
	}
}


var makeEvent = document.getElementsByClassName("modal-accept-button")[0];
	
var postModalButton = document.getElementById("create-event-button");

var closeModalButton = document.getElementsByClassName("modal-close-button")[0];
closeModalButton.addEventListener("click",closeModal);
postModalButton.addEventListener("click",openModal);
makeEvent.addEventListener("click",checkValidPost);
