
var axios = require('axios')
var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'London,uk',
    lat: '0',
    lon: '0',
    callback: 'test',
    id: '2172797',
    lang: 'null',
    units: '"metric" or "imperial"',
    mode: 'xml, html'
  },
  headers: {
    'x-rapidapi-key': '6b87826741mshb9eaebbf387cd3ep1eeb82jsnd617228e0a87',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data)
}).catch(function (error) {
	console.error(error);
});


console.log('next')

//geocode application
var options = {
  method: 'GET',
  url:'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoid2VhdGhlcmFwcDEyMyIsImEiOiJja2lzeTFuamMwajY5MnpwZGg3OW1qMGs4In0.qiSMyzMLN15qzZ-FeIacRw',
  
};



axios.request(options).then(function (response) {
	console.log(response.data.features[0].center[0],response.data.features[0].center[1])
}).catch(function (error) {
	console.error(error);
});



