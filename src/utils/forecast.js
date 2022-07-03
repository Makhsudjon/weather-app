import request from 'request'

const baseURL = 'http://api.weatherstack.com/current?access_key=48fd142ce71319546ae7dac840983ba5';

const forecast = (address, callback) => {
    const url = `${baseURL}&query=${address}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `In ${body.location.country}, ${body.location.name} current temperature is ${body.current.temperature}, feels like ${body.current.feelslike}`);
        }
    })
}

export default forecast;