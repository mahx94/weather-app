const request = require('postman-request')

const forecast = function(latitude, longitude, callback) {
	const url = process.env.WEATHERSTACK_URL + encodeURIComponent(latitude + ',' + longitude)

	request({ url, json: true }, (error, {body}) => {
		const {current = undefined} = body
		if (body.error) {
			callback(body.error, undefined)
		} else if (!error) {
			const {temperature, feelslike, weather_descriptions} = current
			callback(undefined, {weather: weather_descriptions[0], temperature, feelslike})
		} else {
			console.log('ERROR!: Unable to connect to weather service!', undefined)
		}
	})
}

module.exports = forecast