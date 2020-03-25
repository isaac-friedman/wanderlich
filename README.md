# Wanderlich  

I wish I traveled more.  
I created this tool while self isolating during the Covid-19 pandemic to  
help me plan imaginary trips.
You can add this app to your own website by following the instructions below

## Getting Started
To host this app yourself you will need:
1. A FourSquare API key
2. An OpenWeather API key

### Installing
1. Clone this repository.
2. Create a config file `config.js` with the following code:
    ```javascript
    const Config = {
        // Foursquare Info
        clientId: '<Your clientId>',
        clientSecret: '<Your clientSecret>',
        url: 'https://api.foursquare.com/v2/venues/explore?near=',

        // OpenWeather Info
        OWKey: '<Your Open Weather API key>',
        OWUrl: 'https://api.openweathermap.org/data/2.5/weather'
    }

    export default Config;
```

## Authors
* Isaac Friedman

## Acknowledgments
* Based on a project from <https://codecademy.com>
