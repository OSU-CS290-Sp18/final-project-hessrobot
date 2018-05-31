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
		closeModal();
	}
	else{
		console.log("valid post");
		closeModal();
	}
}


var makeEvent = document.getElementsByClassName("modal-accept-button")[0];
	
var postModalButton = document.getElementById("create-event-button");

var closeModalButton = document.getElementsByClassName("modal-close-button")[0];
closeModalButton.addEventListener("click",closeModal);
postModalButton.addEventListener("click",openModal);
makeEvent.addEventListener("click",checkValidPost);
