import tableDaysInOrder from "./Utilitaire/gestionTemps.js";

const time = document.querySelector(".temps");
const weatherToday = document.querySelector(".temperature");
const currentCity = document.querySelector(".city");
const hour = document.querySelectorAll(".heure-nom-prevision");
const timeForHour = document.querySelectorAll(".heure-prevision-valeur");
const daysDiv = document.querySelectorAll(".jour-prevision-nom");
const daysDivTemp = document.querySelectorAll(".jour-prevision-temp");
const imageLogo = document.querySelector(".logo-meteo");

let apiKey = "f861525e62024a24e6d9543dee3c7a2e";
let currentHour = new Date().getHours();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      let long = pos.coords.longitude;
      let latiude = pos.coords.latitude;
      callApi(long, latiude);
    },
    () => {
      alert(
        "you refused to activate your position, so the application is not going to work, please active it"
      );
    }
  );
}
async function callApi(lng, lat) {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`
  );
  const data = await request.json();

  time.textContent = data.current.weather[0].description;
  weatherToday.textContent = `${Math.trunc(data.current.temp)}°`;
  currentCity.textContent = data.timezone;

  //les heures, par tranche de trios, avec leur temperateur*
  for (let i = 0; i < hour.length; i++) {
    let plusHour = currentHour + i * 3;
    if (plusHour > 24) {
      hour[i].textContent = `${plusHour - 24} h`;
    } else if (plusHour === 24) {
      hour[i].textContent = "00 h";
    } else {
      hour[i].textContent = `${plusHour} h`;
    }
  }
  //temps pour 3h
  for (let h = 0; h < timeForHour.length; h++) {
    timeForHour[h].textContent = `${Math.trunc(data.hourly[h * 3].temp)} °`;
  }
  //trois premiers lettres des jours
  for (let l = 0; l < tableDaysInOrder.length; l++) {
    daysDiv[l].textContent = tableDaysInOrder[l].slice(0, 3);
  }
  //Temp par jours
  for (let j = 0; j < 7; j++) {
    daysDivTemp[j].textContent = `${Math.trunc(data.daily[j + 1].temp.day)} °`;
  }
  //dynamique Icon
  if (currentHour >= 6 && currentHour < 21) {
    imageLogo.src = `ressources/jour/${data.current.weather[0].icon}.svg`;
  } else {
    imageLogo.src = `ressources/nuit/${data.current.weather[0].icon}.svg`;
  }
}
