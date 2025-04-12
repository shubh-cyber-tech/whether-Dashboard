import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      console.log(`Searching for city: ${city}`);
      const response = await axios.get(`http://localhost:5001/weather?city=${city}`);
      console.log('Weather data received:', response.data);
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data.error || 'Error fetching weather data');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App; 