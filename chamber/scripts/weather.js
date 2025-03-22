// 🌤 Weather API Configuration
const API_KEY = "6df52e79c2ecd90347e312c5d8bf37a1"; // Your actual API key
const LAT = 6.5; // Chamber latitude
const LON = 3.3; // Chamber longitude

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        const weatherContainer = document.getElementById("weather");
        if (weatherContainer) {
            weatherContainer.innerHTML = "<p>Weather data unavailable</p>";
        }
    }
}

function displayWeather(data) {
    if (!data || !data.list || data.list.length === 0) {
        console.error("Invalid weather data received:", data);
        return;
    }

    const weatherContainer = document.getElementById("weather");
    if (!weatherContainer) return;

    const current = data.list[0]; // Current weather
    const forecast = data.list.filter((entry, index) => index % 8 === 0).slice(1, 4); // Next 3 days

    weatherContainer.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${current.main.temp}°C</p>
        <p><strong>Condition:</strong> ${current.weather[0].description}</p>
        <h4>3-Day Forecast:</h4>
        <ul>
            ${forecast.map(day => `
                <li>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}°C, ${day.weather[0].description}</li>
            `).join("")}
        </ul>
    `;
}

// 🌟 Fetch and Display Spotlight Ads
async function fetchSpotlights() {
    try {
        const response = await fetch("data/chamberMembers.json");
        if (!response.ok) throw new Error("Failed to load chamber members");

        const members = await response.json();
        const goldSilverMembers = members.filter(m => m.membership === "Gold" || m.membership === "Silver");
        const spotlights = getRandomItems(goldSilverMembers, 2);

        displaySpotlights(spotlights);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        const spotlightContainer = document.querySelector(".spotlight-container");
        if (spotlightContainer) {
            spotlightContainer.innerHTML = "<p>Spotlight members unavailable</p>";
        }
    }
}

function getRandomItems(array, num) {
    return array.sort(() => 0.5 - Math.random()).slice(0, num);
}

function displaySpotlights(members) {
    const container = document.querySelector(".spotlight-container");
    if (!container) {
        console.error("Error: .spotlight-container not found in HTML");
        return;
    }

    container.innerHTML = members.map(member => `
        <div class="spotlight-card">
            <h3>${member.name}</h3>
            <p><strong>Membership:</strong> ${member.membership}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join("");
}

async function fetchMembers() {
    try {
        const response = await fetch("data/chamberMembers.json");
        if (!response.ok) throw new Error("Failed to load chamber members");

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    const membersContainer = document.getElementById("members");

    // ✅ Check if the element exists before modifying it
    if (!membersContainer) {
        console.error("Error: #members container not found in HTML");
        return;
    }

    membersContainer.innerHTML = members.map(member => `
        <div class="member-card">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join("");
}

// Run Functions
fetchWeather();
fetchSpotlights();
fetchMembers();
