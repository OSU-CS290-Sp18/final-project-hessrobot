/* This file will handle all interactions with the page including creating and sending post requests */


//Currently in the process of making a difference between editing events and adding events and finding the id of the selected event (other option is to use the title).

var new_event = 1;

function openModal(){
	alert("fuck you");
	var backdrop = document.getElementById("modal-backdrop");
	var modal = document.getElementById("create-modal");
	backdrop.classList.remove("hidden");	
	modal.classList.remove("hidden");
	new_event = 1;
}

//Open it with current stuff already in it
function openModalEdit(event){
	var backdrop = document.getElementById("modal-backdrop");
	var modal = document.getElementById("create-modal");
	backdrop.classList.remove("hidden");	
	modal.classList.remove("hidden");	

	var modal = document.getElementById("create-modal");
	var title = document.getElementById("event-title-input");
	var description = document.getElementById("event-description-input");
	var locations = document.getElementById("event-location-input");
	var type = document.getElementById("event-location-input");
	var time = document.getElementById("event-time-input");
	var capacity = document.getElementById("event-capacity-input");
	var type = document.getElementById("event-type-input");

	let targetNode = event.currentTarget;
	console.log(targetNode);
	let titleNode = targetNode.nextSibling.nextSibling;
	console.log(titleNode);
	let contentNode = titleNode.nextSibling.nextSibling;
	console.log(contentNode);
	
	let locationNode = contentNode.querySelector(".location-input");
	let timeNode = contentNode.querySelector(".Time-input");
	let capacityNode = contentNode.querySelector(".capacity-input");
	let typeNode = contentNode.querySelector(".Event-Type");
	let descriptionNode = contentNode.querySelector(".event-text");
	
	title.value = titleNode.textContent;
	description.value = descriptionNode.textContent;
	locations.value = locationNode.textContent;
	time.value = timeNode.textContent;
	type.value = typeNode.textContent;
	capacity.value = capacityNode.textContent;

	new_event = 0;
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
	var type = document.getElementById("event-type-input");
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
			eventType: type.value,
			eventCapacity: capacity.value,
			eventTime: time.value
		};

		let requestBody = JSON.stringify(eventObject); //Change formatting
		postRequest.setRequestHeader('Content-Type', 'application/json'); //Write header of request object
		postRequest.send(requestBody); //SEND IT!
	
		closeModal();
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
<<<<<<< HEAD

=======
var editButton = document.getElementsByClassName("edit-icon");
>>>>>>> fcc9e7b05c8a381d64da379628f1fb2eaba68e45

closeModalButton.addEventListener("click",closeModal);
postModalButton.addEventListener("click",openModal);
makeEvent.addEventListener("click",checkValidPost);

//Add to all event buttons, not just one
for (let i = 0; i < editButton.length; i++)
	editButton[i].addEventListener("click",openModalEdit);
