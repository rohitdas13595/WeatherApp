const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');




//Paths
//console.log(__dirname);
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');


//Setting up the handlebars and app
const app = express()
const port= process.env.PORT||3000
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setting up static directory
app.use(express.static(publicDir))

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohit Kumar Das'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rohit Kumar Das'
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rohit Kumar Das'
    })

})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter the address'
        })
    }
    //geocode
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ 'error': error });
            }
            forecast(latitude, longitude, (error, forcast_data) => {
                    if (error) {
                        return res.send({ 'error': error });
                    }
                    res.send({
                        address: req.query.address,
                        location: location,
                        latitude: latitude,
                        longitude: longitude,
                        forecast: forcast_data
                    });

                }) //end forcast


        })
        //end geocode   

});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(re.query)
    res.send({
        products: []
    })

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        ermsg: 'Help article  not Found',
        name: 'Rohit Kumar Das',
        title: 404
    });

})

app.get('*', (req, res) => {
    res.render('error', {
        ermsg: 'Page not found',
        name: 'Rohit Kumar Das',
        title: 400
    })

})

//running the server
app.listen(port, () => {
    console.log('Server is up running at port '+port);
})