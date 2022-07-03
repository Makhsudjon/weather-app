const access_key = '4e5f061ab3f99ee6401777e8b455a8e4';
const baseURL = 'http://api.weatherstack.com/current';

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})