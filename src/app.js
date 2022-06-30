const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT

// Define Paths and View Engines for Express
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
	res.render('index', {title: 'Weather APP', name: 'Mihaly-André Hadnagy'})
})

app.get('/help', (req, res) => {
	res.render('help', {title: 'Help', name: 'Mihaly-André Hadnagy'})
})

app.get('/about', (req, res) => {
	res.render('about', {title: 'About', name: 'Mihaly-André Hadnagy'})
})

app.get('/weather', (req, res) => {
	const {query} = req

	if (!query.address) { return res.send({error: 'You must provide an address!'}) }
	
	geocode(query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) { return res.send({error}) }

		forecast(latitude, longitude, (error, data) => {
			if (error) { return res.send({error}) }

			const forecast = data.weather + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees.'
			res.send({forecast, location})
		})
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {title: '404', name: 'Mihaly-André Hadnagy', message: 'Help article not found.'})
})

app.get('*', (req, res) => {
	res.render('404', {title: '404', name: 'Mihaly-André Hadnagy', message: 'Page not found.'})
})


app.listen(port, () => {
	console.log('Server is up on port ' + port)
})