function convertToEasternTime(timeString) {
  var time = new Date(timeString);
  var offset = -5; // Eastern Time offset in hours from UTC
  
  // Adjust the time to Eastern Time (New York)
  var utcTime = time.getTime() + (time.getTimezoneOffset() * 60000);
  var easternTime = new Date(utcTime + (3600000 * offset));
  
  var hours = easternTime.getUTCHours();
  var minutes = easternTime.getUTCMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  // Adjust hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 12 should be displayed as 12, not 0

  var formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  return formattedTime;
}

function fetchWeather(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/weather/');
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var weather = JSON.parse(xhr.responseText);
          callback(null, weather);
        } else {
          var error = new Error('Error: ' + xhr.status + ' - ' + xhr.statusText);
          callback(error, null);
        }
      }
    };
  
    xhr.onerror = function() {
      var error = new Error('Network error occurred');
      callback(error, null);
    };
  
    xhr.send();
  }
  
  function main() {
    fetchWeather(function(error, weather) {
      if (!error && weather) {
        // Your weather condition checks and DOM updates go here...
  
        // Example:
    //day 
    console.log(weather)
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
        // Rest of your conditions and DOM updates...
  
        document.getElementById("temp").innerHTML = weather.current.temperature_2m;
        document.getElementById("feels").innerHTML = weather.current.apparent_temperature;
        document.getElementById("hi").innerHTML = weather.daily.temperature_2m_max[0];
        document.getElementById("low").innerHTML = weather.daily.temperature_2m_min[0];
        //var set = weather.daily.sunset[0];
        //var rise = weather.daily.sunrise[0];
        //document.getElementById("rise").innerHTML = convertToEasternTime(rise);
        //document.getElementById("set").innerHTML = convertToEasternTime(set);
      } else {
        console.error('Error fetching weather:', error.message);
      }
    });
  }
  
setInterval(main, 120000);
  