# Weather Dashboard

A real-time weather dashboard that shows current conditions and 5-day forecasts for any city.

## Quick Start

1. **Install Dependencies**
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

2. **Set Up API Key**
   - Create `.env` file in server directory
   - Add your OpenWeatherMap API key: `OPENWEATHER_API_KEY=your_key_here`

3. **Run the App**
   ```bash
   # Terminal 1 - Start Server
   cd server
   npm start

   # Terminal 2 - Start Client
   cd client
   npm start
   ```

4. **Use the App**
   - Open http://localhost:3000
   - Enter a city name
   - View weather data and forecast

## Features
- Current weather conditions
- 5-day forecast
- Temperature, humidity, wind speed
- Weather icons
- Responsive design

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express
- API: OpenWeatherMap 
