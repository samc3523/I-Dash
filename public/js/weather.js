async function fetchWeather() {
    let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.3584&longitude=-71.1259&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York');
    let weather = await response.json();
    return weather;
}

async function main() { 
    fetchWeather().then(weather => { 
    //day 
    if (weather.current.is_day == 1 && weather.current.snowfall > 0 && weather.current.cloud_cover > 85) {
            document.getElementById("wicon").src = "images/day/snow_cloud.png"
        }
    else if (weather.current.is_day == 1 && weather.current.snowfall > 0 && weather.current.cloud_cover < 85) {
            document.getElementById("wicon").src = "images/day/snow_sun.png"
        }
    else if (weather.current.is_day == 1 && weather.current.rain > 0 && weather.current.cloud_cover > 85) {
            document.getElementById("wicon").src = "images/day/rain.png"
        }
    
    else if (weather.current.is_day == 1 && weather.current.rain > 0 && weather.current.cloud_cover < 85) {
            document.getElementById("wicon").src = "images/day/rain_sun.png"
        }
    else if (weather.current.is_day == 1 && weather.current.rain == 0 && weather.current.cloud_cover > 85) {
            document.getElementById("wicon").src = "images/day/cloudy.png"
        }
    else if (weather.current.is_day == 1 && weather.current.rain == 0 && weather.current.cloud_cover < 85 && weather.current.cloud_cover > 35) {
            document.getElementById("wicon").src = "images/day/cloudy_sun.png"
        }
    else if (weather.current.is_day == 1 && weather.current.rain == 0 && weather.current.cloud_cover < 35) {
            document.getElementById("wicon").src = "images/day/sun.png"
        }    

    // night 

    if (weather.current.is_day == 0 && weather.current.snowfall > 0) {
            document.getElementById("wicon").src = "images/night/snow_night.png"
        }

    else if (weather.current.is_day == 0 && weather.current.rain > 0 ) {
            document.getElementById("wicon").src = "images/night/rain_night.png"
        }

    else if (weather.current.is_day == 0 && weather.current.cloud_cover > 70) {
            document.getElementById("wicon").src = "images/night/moon_clouds.png"
        }
    
    else if (weather.current.is_day == 0 && weather.current.rain > 0 && weather.current.cloud_cover < 70) {
            document.getElementById("wicon").src = "images/night/moon.png"
        }
                
    document.getElementById("temp").innerHTML = weather.current.temperature_2m;
    document.getElementById("feels").innerHTML = weather.current.apparent_temperature;
    document.getElementById("hi").innerHTML = weather.daily.temperature_2m_max[0];
    document.getElementById("low").innerHTML = weather.daily.temperature_2m_min[0];
    let set = new Date(weather.daily.sunset[0]);
    let rise = new Date(weather.daily.sunrise[0]);
    document.getElementById("rise").innerHTML = rise.toLocaleTimeString();
    document.getElementById("set").innerHTML = set.toLocaleTimeString();
    });

    
}

setInterval(main,60000);