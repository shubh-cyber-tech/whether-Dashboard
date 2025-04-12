import React from 'react';

function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <div className="weather-info">
        <img 
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.condition}
        />
        <div>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {Math.round(data.temperature)}°C
          </p>
          <p>{data.condition}</p>
          <p>{data.description}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <p>Humidity: {data.humidity}%</p>
            <p>Wind: {data.windSpeed} m/s</p>
          </div>
        </div>
      </div>

      {data.forecast && data.forecast.length > 0 && (
        <div>
          <h3>5-Day Forecast</h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '10px' 
          }}>
            {data.forecast.map((item, index) => (
              <div key={index} style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '8px',
                minWidth: '120px'
              }}>
                <p>{new Date(item.time).toLocaleDateString()}</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                  alt={item.condition}
                />
                <p>{Math.round(item.temperature)}°C</p>
                <p>{item.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard; 