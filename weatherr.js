// current date and time///

let now = new Date();

let date = document.querySelector(".Day-first");
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",

]

let day = days[now.getDay()];


date.innerHTML = `${day} ${hours}:${minutes} `;

//  city temp //

function showtemp(response) {

  let temperature = Math.round(response.data.main.temp);
  let span = document.querySelector(".temperature");
  span.innerHTML = `${temperature}`;

  let cityname = document.querySelector(".citty");
  cityname.innerHTML = `${response.data.name}`;

  let discription = document.querySelector(".see");
  discription.innerHTML = `${response.data.weather[0].main}`;

  let windspeed = document.querySelector("#wind");
  let cityspeed = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `Wind:${cityspeed} m.h`;

  let humidity = document.querySelector("#humidity");
  let cityhumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity:${cityhumidity}%`;

  CilsiusTemperature = Math.round(response.data.main.temp);

  let ID = response.data.weather[0].id;
  let Icon = response.data.weather[0].icon
  setSrcIcon(ID, Icon);

  getForecast(response.data.coord);

}
//search for city//
function search(city) {

  let units = "metric";
  let keyapi = "d045ef62d06fb179edb328171922730c";
  let urlapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyapi}&units=${units}`;
  axios.get(`${urlapi}`).then(showtemp);

}

function handleSubmit(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value)
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


// C & F link change////

function displayFahrenheitTemperture(event) {
  event.preventDefault();
  let FahrenheitTemperture = Math.round((CilsiusTemperature * 9 / 5) + 32);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = FahrenheitTemperture;
  // remove the active class the  celsiuslink
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");



}
function displaycelsiusTemperture(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = CilsiusTemperature;

  // remove the active class the  fahrenheitlink
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");

}

let CilsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperture);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperture);

// display icon//

function setSrcIcon(ID, Icon) {

  let mastericon = document.querySelector("#master-icon");
  if (ID >= 200 && ID <= 232) {
    mastericon.src = "icons/11n.gif";
  }
  if (ID >= 300 && ID <= 321) {
    mastericon.src = "icons/09d.gif";
  }
  if (ID >= 500 && ID <= 504) {
    mastericon.src = "icons/10d.gif";
  }
  if (ID >= 511 && ID <= 532) {
    mastericon.src = "icons/10n.gif";
  }
  if (ID >= 600 && ID <= 622) {
    mastericon.src = "icons/13d.gif";
  }
  if (ID >= 701 && ID <= 781) {
    mastericon.src = "icons/50d.gif";
  }
  if (ID >= 801 && ID <= 804) {
    mastericon.src = "icons/04n.gif ";
  }
  if (ID == 800 && Icon.includes("01n")) {
    mastericon.src = "icons/01n.gif";
  }
  if (ID == 800 && Icon.includes("01d")) {
    mastericon.src = "icons/01d.gif ";
  }
}

// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#Forecast");

  let forecastHTML = `<div class="row">`

  forecast.forEach(function (forecastDay, index) {

    if (index < 6) {

      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
        <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>            
           <img class="icon-1" 
           src="icons/${forecastDay.weather[0].icon}.gif" alt="" width="55" >
            <div class="weather-forecast-temperatures" id="degree-1">
              <span  class="weather-forecast-temperatures-max">
              ${Math.round(forecastDay.temp.max)}°
                  </span>  
               <span class="weather-forecast-temperatures-min">
                 ${Math.round(forecastDay.temp.min)}°
               </span>    
             </div>
         </div>           
  `;
    }
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML

}
;
function getForecast(coordinates) {

  let keyapi = "d045ef62d06fb179edb328171922730c";
  let urlapi = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${keyapi}&units=metric`;

  axios.get(`${urlapi}`).then(displayForecast);

}
// city defult
search("tehran");