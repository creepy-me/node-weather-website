const axios = require('axios')
const forecast = (city, callback) =>{
    const url='http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=1196014b061f5273e817aa508c7c9b5b&units=metric'
    axios.get(url)
    .then(function ({data}) {
     
      callback(data.weather[0].description + ' . It is ' + data.main.temp + ' degrees out. Min. temperature is ' + data.main.temp_min + ' . Max. temperature is ' + data.main.temp_max,undefined);
    })
    .catch(function (error) {
      // handle error
      callback(undefined,'Unable to connect to weather service!');
    })
    .then(function () {
      // always executed
    });
  }

  module.exports = forecast