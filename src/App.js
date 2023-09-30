import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const weatherColors = {
  hot: 'rgba(255, 0, 0, 0.5)',    // Red for hot
  cold: 'rgba(0, 0, 255, 0.5)',   // Blue for cold
  rainy: 'rgba(0, 128, 255, 0.5)', // Aqua for rainy
  default: 'rgba(255, 255, 255, 0.2)', // Default background
};

function App() {
  const [city, setCity] = useState('Barddhaman');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '3d4f6b61dcc178244b7302428b60d1cd'; // change this to your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const getData = () => {
    axios
      .get(url)
      .then((res) => setWeatherData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    document.getElementById('weatherInput').focus();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    getData();
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      getData();
    }
  };

  const temp = weatherData ? weatherData.main.temp : '';
  const weather = weatherData ? weatherData.weather[0].description : '';

  const getBackgroundColor = (temp, weather) => {
    if (temp >= 30) {
      return weatherColors.hot; // Red for hot
    } else if (temp < 10) {
      return weatherColors.cold; // Blue for cold
    } else if (weather.includes('rain')) {
      return weatherColors.rainy; // Aqua for rainy
    } else {
      return weatherColors.default; // Default background
    }
  };

  const boxBackgroundColor = getBackgroundColor(temp, weather);

  return (
    <div className="App">
      <header className="App-header">
        <div className="weather">
          <input
            id="weatherInput"
            type="text"
            name="city"
            placeholder="City name"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        <div
          className="results"
          style={{
            border: '1px solid #111111',
            borderRadius: 15,
            backgroundColor: boxBackgroundColor,
            padding: '2rem',
            margin: '1rem',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          <div style={{ fontSize: 30 }}>
            {weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : ''}
          </div>

          <div style={{ color: 'darkgrey', fontSize: 18 }}>
            {new Date().toLocaleString()}
          </div>

          <div style={{ fontSize: 54, fontWeight: 'bold' }}>
            {weatherData ? `${Math.round(temp)}' C` : ''}
          </div>

          <img
            src={weatherData ? `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` : ''}
            alt="Weather icon"
          />

          <div style={{ textTransform: 'capitalize', marginBottom: 20 }}>
            {weatherData ? weatherData.weather[0].description : ''}
          </div>

          <div>Humidity: {weatherData ? `${weatherData.main.humidity}%` : ''}</div>
          <div>Pressure: {weatherData ? `${weatherData.main.pressure} hPa` : ''}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
