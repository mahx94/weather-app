const request = require('postman-request')

const geocode = function(address, callback) {
	const url = process.env.POSITIONSTACK_URL + encodeURIComponent(address)

	request({ url, json: true }, (error, {body}) => {
		const {data = undefined} = body
		if (body.error) {
			callback('ERROR!: Unable to find location!', undefined)
		} else if (!error) {
			const {latitude, longitude, name: city, region, country} = data[0]
			callback(undefined, {latitude, longitude, location: city + ', ' + region + ', ' + country})
		} else {
			callback('ERROR!: Unable to connect to geocoding service!', undefined)
		}
	})
}

module.exports = geocode