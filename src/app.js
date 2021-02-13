
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


const express= require('express')
const path= require('path')
const hbs= require('hbs')

const app= express()

//define path for express config.
const viewsPath= path.join(__dirname, '../template/views')
const publicDirectory= path.join(__dirname, '../public')
const partialsPath= path.join(__dirname, '../template/partials')

//set up handlebar and path for view
app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

//set up static directory
app.set('views', viewsPath )
app.get('',(req, res)=> {
    res.render('index', {
        title: 'weather app',
        name: 'Shraddha'
    })
})

app.get('/about',(req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Shraddha'
    })
})

app.get('/help',(req, res)=> {
    res.render('help', {
        example: 'Help coming!',
        title: 'Help',
        name: 'Shraddha'
    })
}) 


app.get('/weather',(req, res)=> {
    if(!req.query.address) {
        return res.send({
            error:'You must enter the address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location})=> {
        if(error) {
            res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if(error) {
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404!',
        name: 'Shraddha',
        er: 'Help article not found:('
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404!',
        name: 'Shraddha',
        er: 'Page not found:('
    })
})

app.listen(3000, ()=> {
    console.log(' Server is running on port 3000')
})