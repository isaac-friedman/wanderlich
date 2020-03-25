import Config from './config.js';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//Helper functions for generating HTML used by the Render functions
const createVenueHTML = (name, location, icon) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${icon}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  console.log(currentDay)
  return `<h2>${weekDays[(new Date()).getDay()]}</h2>
		<h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}
const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

//For fetching from APIs
const getVenues = async () => {
    const city = $input.val();
    const fetchUrl = Config.url+city+"&limit=10"+"&client_id="+Config.clientId+"&client_secret="+Config.clientSecret+"&v=20200324";
    console.log(fetchUrl);
    try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      console.log(venues[0]);
      return venues;
    } else {throw new Error('Unexpected Problem!');}
    } catch(error) {
      console.log(error);
    }
}

const getWeather = async () => {
    console.log("Let's get that weather!");
    const city = $input.val();
    const fetchUrl = Config.OWUrl+'?q='+city+'&APPID='+Config.OWKey;
    console.log(fetchUrl);
    try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return(jsonResponse);
    } else {throw new Error('Unexpected Problem!');}
    } catch(error) {
      console.log(error);
    }
}
//For Rendering HTML
const renderVenues = (toRender) => {
    console.log("Rendering Venues");
    console.log(toRender);
    $venueDivs.forEach(($venue, index) => {
        const venue = toRender[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
        const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
    });
    $destination.append(`<h2>${toRender[0].location.city}</h2>`);
}

const renderWeather = (toRender) => {
    console.log("Rendering Weather");
    console.log(toRender);
    let weatherContent = createWeatherHTML(toRender);
    $weatherDiv.append(weatherContent);
}



//MAIN
const run = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    getVenues().then(venues => renderVenues(venues));
    getWeather().then(weather => renderWeather(weather));
    return false;
}

$submit.click(run);
