const API_KEY = "ce9c9800ef814874a02163602242212";

const weatherInfo = document.querySelector('.weather-info');
const weatherText = document.querySelector('#weather');
const tempElement = document.querySelector('#temp');
const windElement = document.querySelector('#wind');
const humidityElement = document.querySelector('#humidity');
const cityInput = document.querySelector('#city');
const btn = document.querySelector('#btn');

function showWeatherInfo() {
    weatherInfo.classList.remove("hide");
    // Add animation class after removing hide
    setTimeout(() => {
        weatherInfo.classList.add("show");
    }, 10);
}

function hideWeatherInfo() {
    weatherInfo.classList.remove("show");
    // Add hide class after animation completes
    setTimeout(() => {
        weatherInfo.classList.add("hide");
    }, 300);
}

function updateWeatherIcon(condition) {
    const iconElement = document.querySelector('.weather-icon i');
    // Map weather conditions to Font Awesome icons
    const iconMap = {
        'Clear': 'sun',
        'Sunny': 'sun',
        'Partly cloudy': 'cloud-sun',
        'Cloudy': 'cloud',
        'Overcast': 'cloud',
        'Rain': 'cloud-rain',
        'Light rain': 'cloud-rain',
        'Moderate rain': 'cloud-rain',
        'Heavy rain': 'cloud-showers-heavy',
        'Snow': 'snowflake',
        'Light snow': 'snowflake',
        'Moderate snow': 'snowflake',
        'Heavy snow': 'snowflake',
        'Thunder': 'bolt',
        'Thunderstorm': 'cloud-bolt',
        'Fog': 'smog',
        'Mist': 'smog'
    };

    const iconName = iconMap[condition] || 'cloud';
    iconElement.className = `fas fa-${iconName}`;
}

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        cityInput.focus();
        return;
    }

    try {
        // Hide previous weather info with animation
        if (!weatherInfo.classList.contains("hide")) {
            hideWeatherInfo();
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const { current } = data;
        
        weatherText.innerText = current.condition.text;
        tempElement.innerText = `${current.temp_c}°C`;
        windElement.innerText = `${current.wind_kph} km/h`;
        humidityElement.innerText = `${current.humidity}%`;
        
        updateWeatherIcon(current.condition.text);
        showWeatherInfo();

    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherText.innerText = "City not found. Please try again.";
        tempElement.innerText = "--°C";
        windElement.innerText = "-- km/h";
        humidityElement.innerText = "--%";
        updateWeatherIcon('cloud');
        showWeatherInfo();
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

// Add event listeners
btn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});