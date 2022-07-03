console.log('Client side javascript file isloaded !');

const access_key = '4e5f061ab3f99ee6401777e8b455a8e4';
const baseURL = 'http://api.weatherstack.com/current';




const form = document.querySelector('form');
const search = document.querySelector('input');
const weather = document.querySelector('.weather-result')
const makeWeather = (data) => {
    const result = `In ${data.location.country}, ${data.location.name} current temperature is ${data.current.temperature}, feels like ${data.current.feelslike}, `
    return result;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    if(location){
        const url = `${baseURL}?access_key=${access_key}&query=${location}`
        return fetch(url)
        .then(res=>{
            res.json()
            .then(data=>{
                if(data.error) {
                    console.log(data)
                    return weather.textContent = 'Please, try another place';
                }
                weather.textContent = makeWeather(data);
            })
        })
    }

    return weather.textContent = 'Location is not provided';
})