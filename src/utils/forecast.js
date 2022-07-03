import request from 'request'

const baseURL = 'http://api.weatherstack.com/current?access_key=48fd142ce71319546ae7dac840983ba5';

const forecast = (address, callback) => {
    const url = `${baseURL}&query=${address}`;
    request({ url, json: true }, (error, data) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (data.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {location: `${data.body.location.country}, ${data.body.location.name}`, info: `Current temperature is ${data.body.current.temperature}, feels like ${data.body.current.feelslike}`});
        }
    })
}

export default forecast;