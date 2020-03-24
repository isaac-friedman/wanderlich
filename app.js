import Config from './config.js';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const fetchUrl = Config.url+city+"&limit=10"+"&client_id="+Config.clientId+"&client_secret="+Config.clientSecret+"&v=20200324";
    console.log(fetchUrl);
    try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items;
      console.log(venues);
    } else {throw new Error('Unexpected Problem!');}
    return venues;
    } catch(error) {
      console.log(error);
    }
}

const run = () => {
  getVenues();
  return false;
}

$submit.click(run);
