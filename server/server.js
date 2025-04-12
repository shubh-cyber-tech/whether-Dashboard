const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Use a valid API key
const API_KEY = '4bd5a3f7c9ae10a430f12ad24031f6ee';

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        console.log(`Fetching weather for city: ${city}`);

        // First, get the latitude and longitude for the city using the Geocoding API
        const geocodeResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: API_KEY
            }
        });

        console.log('Geocoding response:', geocodeResponse.data);

        if (!geocodeResponse.data || geocodeResponse.data.length === 0) {
            return res.status(404).json({ error: 'City not found' });
        }

        const { lat, lon } = geocodeResponse.data[0];
        console.log(`Coordinates for ${city}: lat=${lat}, lon=${lon}`);

        // Now get the weather forecast using the coordinates
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });

        console.log('Weather response received');

        // Get the current weather from the first item in the list
        const currentWeather = weatherResponse.data.list[0];
        
        const weatherData = {
            temperature: currentWeather.main.temp,
            condition: currentWeather.weather[0].main,
            description: currentWeather.weather[0].description,
            humidity: currentWeather.main.humidity,
            windSpeed: currentWeather.wind.speed,
            icon: currentWeather.weather[0].icon,
            forecast: weatherResponse.data.list.slice(0, 5).map(item => ({
                time: item.dt_txt,
                temperature: item.main.temp,
                condition: item.weather[0].main,
                icon: item.weather[0].icon
            }))
        };

        console.log('Sending weather data:', weatherData);
        res.json(weatherData);
    } catch (error) {
        console.error('Error details:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        }
        
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else if (error.response && error.response.status === 401) {
            res.status(401).json({ error: 'Invalid API key' });
        } else {
            res.status(500).json({ error: 'Error fetching weather data', details: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
