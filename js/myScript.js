$(document).ready( function() {
  //Show °C and Km by default
  $('#forCK').hide();
  $('#forTempF').hide();
  $('#forFeelsF').hide();
  $('#forWindM').hide();
  $('#forVisibilityM').hide();
  //Show °F and Mi and hide °C and Km when clicked
  $( "#forFM" ).click(function() {
  $('#forFM').hide();
  $('#forCK').show();
  $('#forTempC').hide();
  $('#forFeelsC').hide();
  $('#forWindK').hide();
  $('#forVisibilityK').hide();
  $('#forTempF').show();
  $('#forFeelsF').show();
  $('#forWindM').show();
  $('#forVisibilityM').show();
});
  //Show °C and Km and hide °F and Mi when clicked
  $( "#forCK" ).click(function() {
  $('#forCK').hide();
  $('#forFM').show();
  $('#forTempF').hide();
  $('#forFeelsF').hide();
  $('#forWindM').hide();
  $('#forVisibilityM').hide();
  $('#forTempC').show();
  $('#forFeelsC').show();
  $('#forWindK').show();
  $('#forVisibilityK').show();
});
  
	var errorMessage;
    if (navigator.geolocation) { //Here we can get the user position. API function borrowed from w3school @ http://www.w3schools.com/html/html5_geolocation.asp
        navigator.geolocation.getCurrentPosition(findPosition);
    } else {
        errorMessage = "Geolocation is not supported by this browser.";
    }

	function findPosition(position) { 
  $.ajax({ //This function parses the json file produced by wunderground API
 url : "http://api.wunderground.com/api/b99eb5ad64637581/geolookup/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var temp_c = parsed_json['current_observation']['temp_c'];
  var feelslike_f = parsed_json['current_observation']['feelslike_f'];
  var feelslike_c = parsed_json['current_observation']['feelslike_c'];
  var wind_mph = parsed_json['current_observation']['wind_mph'];
  var wind_kph = parsed_json['current_observation']['wind_kph'];
  var wind_dir = parsed_json['current_observation']['wind_dir'];
  var weather = parsed_json['current_observation']['weather'];
  var humidity = parsed_json['current_observation']['relative_humidity'];
  var visibilityM = parsed_json['current_observation']['visibility_mi'];
  var visibilityK = parsed_json['current_observation']['visibility_km'];
  var pressure = parsed_json['current_observation']['pressure_mb'];
  var indexUV = parsed_json['current_observation']['UV'];
  var icon = "<img src=\"" + parsed_json['current_observation']['icon_url'] + "\">";
  
  $('#forCity').append(location);
  $('#forTempF').append(temp_f + "° F");
  $('#forTempC').append(temp_c + "° C");
  $('#forFeelsF').append(temp_f + "° F");
  $('#forFeelsC').append(temp_c + "° C");
  $('#forWindM').append(wind_mph + " mph, " + wind_dir);
  $('#forWindK').append(wind_kph + " kmh, " + wind_dir);
  $('#forWeather').append(weather);
  $('#forIcon').append(icon);
  $('#forHumidity').append(humidity);
  $('#forPressure').append(pressure + " mb");
  $('#forVisibilityM').append(visibilityM + " Mi");
  $('#forVisibilityK').append(visibilityK + " Km");
  $('#forIndexUV').append(indexUV);
  
  switch (weather) { // this switch is useful to change the image according to the weather conditions. If we would like to make it more professional we can add more specific images.
	  case "Chance of Flurries":
	  case "Chance of Sleet":
	  case "Chance of Snow":
	  case "Flurries":
	  case "Sleet":
	  case "Snow":
	  case "Heavy Snow Showers":
	  case "Heavy Snow Blowing Snow Mist":
	  case "Heavy Snow":
	  case "Heavy Snow Grains":
	  case "Heavy Blowing Snow":
	  case "Light Snow Showers":
	  case "Light Snow Blowing Snow Mist":
	  case "Light Snow":
	  case "Light Snow Grains":
	  case "Light Blowing Snow":
	  case "Heavy Low Drifting Snow":
      case "Light Low Drifting Snow":
	  $('.panel-body').addClass('snowy');
	  break;
	  case "Chance of Rain":
	  case "Chance Rain":
	  case "Chance of Freezing Rain":
	  case "Freezing Rain":
	  case "Rain":
	  case "Light Rain Mist":
	  case "Heavy Rain Mist":
	  case "Light Rain Showers":
	  case "Heavy Rain Showers":
	  case "Heavy Drizzle":
	  case "Heavy Rain":
	  case "Heavy Freezing Drizzle":
	  case "Heavy Freezing Rain":
	  case "Light Drizzle":
	  case "Light Rain":
	  case "Light Freezing Drizzle":
   	  case "Light Freezing Rain":
	  case "Squalls":	  
	  $('.panel-body').addClass('rainy');
	  break;
	  case "Chance of Thunderstorms":
	  case "Chance of a Thunderstorm":
	  case "Thunderstorms":
	  case "Thunderstorm":
	  case "Light Thunderstorm":
	  case "Light Thunderstorms and Rain":
	  case "Light Thunderstorms and Snow":
	  case "Light Thunderstorms and Ice Pellets":
      case "Light Thunderstorms with Hail":
      case "Light Thunderstorms with Small Hail":
	  case "Heavy Thunderstorm":
      case "Heavy Thunderstorms and Rain":
      case "Heavy Thunderstorms and Snow":
      case "Heavy Thunderstorms and Ice Pellets":
      case "Heavy Thunderstorms with Hail":
      case "Heavy Thunderstorms with Small Hail":
	  $('.panel-body').addClass('thunder-storm');
	  break;
	  case "Clear":
	  case "Sunny":
	  $('.panel-body').addClass('sunny');
	  break;
	  case "Cloudy":
	  case "Overcast":
	  case "Funnel Cloud":
	  $('.panel-body').addClass('cloudy');
	  break;
	  case "Fog":
	  case "Haze":
	  case "Patches of Fog":
	  case "Shallow Fog":
	  case "Partial Fog":
	  case "Heavy Freezing Fog":
	  case "Heavy Fog":
	  case "Heavy Fog Patches":
	  case "Heavy Haze":
	  case "Light Freezing Fog":
	  case "Light Fog":
	  case "Light Fog Patches":
	  case "Light Haze":
	  case "Heavy Mist":
	  case "Light Mist":
	  $('.panel-body').addClass('foggy');
	  break;
	  case "Mostly Cloudy":
	  case "Partly Cloudy":
	  case "Scattered Clouds":
	  $('.panel-body').addClass('partly-cloudy');
	  break;
	  case "Mostly Sunny":
	  case "Partly Sunny":
	  $('.panel-body').addClass('partly-sunny');
	  break;
	  case "Heavy Ice Pellet Showers":
	  case "Heavy Hail Showers":
	  case "Heavy Small Hail Showers":
	  case "Heavy Ice Crystals":
	  case "Heavy Ice Pellets":
	  case "Heavy Hail":
	  case "Light Ice Pellet Showers":
	  case "Light Hail Showers":
	  case "Light Small Hail Showers":
	  case "Light Ice Crystals":
	  case "Light Ice Pellets":
	  case "Light Hail":
	  case "Small Hail":
	  $('.panel-body').addClass('hail');
	  break;
	  case "Light Low Drifting Widespread Dust":
	  case "Light Low Drifting Sand":
	  case "Light Blowing Widespread Dust":
	  case "Light Blowing Sand":
	  case "Light Widespread Dust":
	  case "Light Sand":
	  case "Light Dust Whirls":
	  case "Light Sandstorm":
	  case "Heavy Low Drifting Widespread Dust":
	  case "Heavy Low Drifting Sand":
	  case "Heavy Blowing Widespread Dust":
	  case "Heavy Blowing Sand":
	  case "Heavy Widespread Dust":
	  case "Heavy Sand":
	  case "Heavy Dust Whirls":
	  case "Heavy Sandstorm":
	  $('.panel-body').addClass('sand');
	  break;
	  case "Heavy Smoke":
	  case "Heavy Volcanic Ash":
	  case "Light Smoke":
	  case "Light Volcanic Ash":
	  $('.panel-body').addClass('volcano');
	  break;
	  case "Heavy Spray":
      case "Light Spray":
	  $('.panel-body').addClass('spray');
	  break;
	  default:
	  break;
  }
   
    }
  });
  }
  
});