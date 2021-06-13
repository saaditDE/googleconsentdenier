/*
	Code by Karim S. 06/2021 // SAAD-IT
*/

// enables the radio buttons which are for don't allow (=> input.value == 'false')
function dontAllowEverything () {
 	var status = false;
 	status = checkAllRadioButtons();
	status = punchSubmitButton();
	return status;
}


// Punch the Submit Button 
function punchSubmitButton() {
	var inputs = document.getElementsByTagName('input');
	for(var i in inputs) {  
		var input = inputs[i];
		if (input.type == 'submit') {
			input.click();
			return true;
		}
	}
	return false;
}

// Consent denier machine ;)
function checkAllRadioButtons() {
	var worked = false;
	var inputs = document.getElementsByTagName('input');
	for(var i in inputs) {  
		var input = inputs[i];
		if (input.type == 'radio' && input.value == 'false') {
			input.checked = true; 
			worked = true;
		}
	}
	return worked;
}

function findAdjustButton () {
	var VDity = document.getElementsByClassName('VDity')[0]; //adjustBtn
	if (VDity == undefined) {
		console.log("Error finding Adjust button");
		console.log(VDity);
		return false;
	}
	return (VDity.getElementsByTagName('Button')[0] != null);
}

function isCurrentPageConsentPage2(){
	return window.location.href.toString().includes('https://consent.google.de');
}

function hasPageConsentPayload() {
	for (var i in document.scripts) { 
		var x = document.scripts[i].innerHTML.toString().includes('consentCookiePayload');
		if(x)return true;
	}
	return false;
}

function ask() {
	if (confirm('No consent (Tracking & Cookies) for Google?')) {
		window.location.href="https://consent.google.de/dl?continue=https://www.google.de/?gws_rd%3Dssl&gl=DE&hl=en&pc=shp&src=1";
		return true;
	} else {
		alert('Warning: You gave your consent! Google Spying active, be aware :-)');
	}
	return false;
}

function main(){
	
	if (! isCurrentPageConsentPage2() ) {
		// no checkboxes, but maybe the first page with the adjust btn
		if( hasPageConsentPayload() ) {
			/*
				Here it's very likely the first page. 
				It will ask the user if the wants to deny all consent, if he clicks ok he gets redirected to the radio btn consent page
			*/
			if (! ask() ) {
				console.log("ERR Page1");
				return;
			}
		}
	} else {
		// This page is very likely the page2 (with the checkboxes), lets run our code for dont allowing everything.
		dontAllowEverything();
	}
}


// Dont remove this line, otherwise this content script breaks! :o
main();
