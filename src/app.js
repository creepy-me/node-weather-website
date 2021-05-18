
const forecast= require('./utils/forecast')

const path= require('path')
const express= require('express')
const hbs= require('hbs')

const app= express()
const port = process.env.PORT || 3000
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
        title: 'Weather',
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
        helptext: 'Help coming!',
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
    
    forecast(req.query.address,(response,error) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: response,
            address: req.query.address
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

app.listen(port, ()=> {
    console.log(' Server is running on port ' + port)
})