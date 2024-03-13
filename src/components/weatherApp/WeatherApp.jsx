import './WeatherApp.css';
import { useState } from 'react';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rain from '../assets/rain.png';
import search from '../assets/search.png';
import snow from '../assets/snow.png';
import windIcon from '../assets/wind.png';

const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState(cloud);
  const api_key = '9b780ec76101940441e461e71fe5d71b';

  const searchFunc = async () => {
    const element = document.getElementsByClassName('cityInput');
    if (element[0].value === '') {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const humidity = document.getElementsByClassName('humidity-percentage');
    const wind = document.getElementsByClassName('wind-percentage');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');

    humidity[0].innerHTML = data.main.humidity + ' %';
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + '°C';
    location[0].innerHTML = data.name;

    // Set weather icon based on received weather icon
    const weatherCode = data.weather[0].icon;
    setWeatherIcon(getWeatherIcon(weatherCode));
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return clear;
      case '02d':
      case '02n':
        return cloud;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return drizzle;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return rain;
      case '13d':
      case '13n':
        return snow;
      default:
        return cloud;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={() => { searchFunc(); }}>
          <img src={search} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="weather" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percentage">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
