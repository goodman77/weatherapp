(function(){ 
 
	var weatherAPI = 'https://weathersync.herokuapp.com';
	var weatherIconUrl = 'http://openweathermap.org/img/w/';
	var lat, lng, temp, weather_desc, weather_icon, loader, content
	// define $ as document element
	,el = function(el){return document.getElementById(el);};
	
fetch(`${weatherAPI}/ip`)
	.then(handleErrors)
    .then(function(response) { return response.json(); })
	.then(function({ city, country, location }) {
		
	  // define lang and lng
	  lat = location.latitude;
	  lng = location.longitude;
	  
	  // send city and country code to page
	  sendToPage("city", city+', '+country.code);
	  
	  // fetch again to get the weather info.
	  fetch(`${weatherAPI}/weather/${lat},${lng}`)
	  		.then(handleErrors) // handle error if any
			.then(function(response) { return response.json(); }) // get response
			.then( weather_data => {
				tempInF = tempkToF(weather_data.main.temp);
				weather_desc = weather_data.weather[0].description;
				weather_icon = weather_data.weather[0].icon;
				
				// send temp, desc, weather icon to page
				sendToPage("temp", tempInF);
				sendToPage("desc", weather_desc);
				sendImage("weather_icon",`${weatherIconUrl}${weather_icon}.png`);
				
				// show content and hide spinner
				hide("loader");
				show("content");
			})
		
	});
	
	// function to convert temperature to F
	function tempkToF(tempK){
		return Math.round(tempK * (9/5) - 459.67);
	}
	
	// handle error response
	function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    	return response;
    }
	
	// show element function
	function show(id){
		el(id).setAttribute("class", ['show']);
	}
	// hide element function
	function hide(id){
		el(id).setAttribute("class", ['hide']);
	}
	
	// send ele to page
	function sendToPage(id, txt){
		el(id).innerHTML = txt;
	}
	
	// send img to page
	function sendImage(id, imageSrc){
		el(id).src = imageSrc;
	}
})();