const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// OpenWeatherMap API URL with the 'weather' endpoint
const url ='https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=[40986fb8178dc7ea8669ea176497fb85]'
// Asynchronous function to fetch data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For debugging
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display weather data
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; // Change to &deg;F for imperial
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/w/10d.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1); // Capitalize first letter
}

// Call the API function
apiFetch();