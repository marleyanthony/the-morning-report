// variables ===================================
let date = document.querySelector('.header__date');
let report = document.querySelector('.report');
let reportGreeting = document.querySelector('.report__header');
let reportTemp = document.querySelector('.report__temp');
let reportCondition = document.querySelector('.report__conditions');
let reportRecommend = document.querySelector('.report__recommend');
let quote = document.querySelector('.report__quote');
let city = document.querySelector('.city__form-input');
let country = document.querySelector('.city__form-select');
let form = document.querySelector('.city__form');
let cityContainer = document.querySelector('.city');
let geoLocateBtn = document.querySelector('.city__geolocate-btn');



// data ===================================
let apiKey = 'd603a3ba51ea401c7760e9bbec6ad68a';
let weatherData = {};



// display the date in the upper left corner
date.innerHTML = new Date().toLocaleDateString();


// functions ===================================


// display greeting
// if statement to figure out what time of day it is and display the appropriate greeting 
function displayGreeting() {
  if (new Date().getHours() < 12) {
    reportGreeting.innerHTML = 'Good Morning 🙂'
  } else if (new Date().getHours() < 20) {
    reportGreeting.innerHTML = 'Good Afternoon 🙂'
  } else {
    reportGreeting.innerHTML = 'Good Evening 🙂'
  }
}

displayGreeting();



// event listener ===================================
form.addEventListener('submit', (submit) => {
  submit.preventDefault();
  updateDOM();
  let city = submit.target.city.value;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d603a3ba51ea401c7760e9bbec6ad68a`;
  let apiURLQuote = 'https://quotes.rest/qod?language=en';

  getAPI(apiURL);

  getQuoteAPI(apiURLQuote);
});

// remove form and add report container
function updateDOM() {
  cityContainer.style.display = 'none';
  report.style.display = 'block';
}

function capitalize(condition) {
  condition.charAt(0).toUpperCase() + condition.slice(1);
}

// get api information 
function getAPI(url) {
  axios.get(url)
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      let temp = Math.floor((data.main.temp) - 273) + '°C';
      let condition = data.weather[0].description;
      let idNum = data.weather[0].id;

      condition = condition.charAt(0).toUpperCase() + condition.slice(1);

      weatherData.temperature = temp;
      weatherData.conditions = condition;
      weatherData.id = idNum;

      console.log(weatherData);

      reportTemp.innerHTML = temp;
      reportCondition.innerHTML = condition;

      console.log(condition);

      if (weatherData.id >= 200 && weatherData.id <= 232) {
        reportRecommend.innerHTML = `It's going to be storming, be careful! 😟`
      } else if (weatherData.id >= 300 && weatherData.id <= 321) {
        reportRecommend.innerHTML = `It's going to be drizzling, bring some rain boots! 🌧`
      } else if (weatherData.id >= 500 && weatherData.id <= 531) {
        reportRecommend.innerHTML = `It's going to be raining, bring an umbrella. ☔️`
      } else if (weatherData.id >= 600 && weatherData.id <= 622) {
        reportRecommend.innerHTML = `It's going to be snowing, dress warm! ☃️`
      } else if (weatherData.id >= 701 && weatherData.id <= 781) {
        reportRecommend.innerHTML = `Careful out there! 😟`
      } else if (weatherData.id === 800) {
        reportRecommend.innerHTML = `It's going to be beautiful outside, enjoy it! 😎`
      } else if (weatherData.id >= 801 && weatherData.id <= 804) {
        reportRecommend.innerHTML = `It's going to be a cloudy one. ☁️`
      }
    });
}


function getQuoteAPI(url) {
  axios.get(url)
    .then((response) => response.data)
    .then((data) => {
      console.log(data.contents.quotes[0].quote);
      quote.innerHTML = `"` + data.contents.quotes[0].quote + `"`;
    });
}