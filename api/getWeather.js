async function getWeather() {
    try {
        let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.3584&longitude=-71.1259&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
        
        if (!response.ok) {
            // Handle non-successful response (e.g., HTTP error)
            console.error(`Weather API request failed with status: ${response.status}`);
            return null; // or throw an error if you want to stop execution
        }

        let weather = await response.json();
        return weather;
    } catch (error) {
        // Handle other errors (e.g., network issues, JSON parsing error)
        console.error('An error occurred while fetching weather data:', error.message);
        return null; // or throw an error if you want to stop execution
    }
}

module.exports = {
    getWeather,
};
