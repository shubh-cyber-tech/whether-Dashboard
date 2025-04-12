const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Weather route
router.get('/', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // To get temperature in Celsius
      },
    });

    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data. Please try again later.' });
  }
});

module.exports = router; 