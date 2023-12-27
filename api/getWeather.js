async function getWeather() {
    let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.3584&longitude=-71.1259&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
    let weather = await response.json();
    return weather;
}

module.exports = {
    getWeather,
  };