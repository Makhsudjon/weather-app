import request from 'request'

const access_key = '4e5f061ab3f99ee6401777e8b455a8e4';
const baseURL = 'http://api.weatherstack.com/current';



const forecast = (address, callback) => {
    const url = `${baseURL}?access_key=${access_key}&query=${address}.json`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body.error);
            callback('Unable to find location', undefined)
        } else {
            console.log(body)
            callback(undefined, 'In '+body.request.query + ' it is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.cloudcover + '% chance of rain.')
        }
    })
}

export default forecast;