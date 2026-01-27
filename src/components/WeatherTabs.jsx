import React, { useState } from 'react';

const WeatherTabs = ({ weatherData, forecastData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!weatherData) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true
    });
  };

  const getDailyForecast = () => {
    if (!forecastData || !forecastData.list) return [];
    
    const dailyData = [];
    const processedDates = new Set();
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toDateString();
      const hour = date.getHours();
      
      if (!processedDates.has(dateStr) && hour >= 11 && hour <= 13) {
        processedDates.add(dateStr);
        dailyData.push(item);
      }
    });
    
    return dailyData.slice(0, 5);
  };

  const getHourlyForecast = () => {
    if (!forecastData || !forecastData.list) return [];
    return forecastData.list.slice(0, 12);
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'thunderstorm': '⛈️',
      'drizzle': '🌦️',
      'mist': '🌫️'
    };
    return icons[condition.toLowerCase()] || '🌤️';
  };

  const getWeatherClass = (condition) => {
    const classes = {
      'clear': 'weather-icon-sunny',
      'rain': 'weather-icon-rainy',
      'clouds': 'weather-icon-cloudy',
      'snow': 'weather-icon-snowy'
    };
    return classes[condition.toLowerCase()] || 'weather-icon-sunny';
  };

  const dailyForecast = getDailyForecast();
  const hourlyForecast = getHourlyForecast();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'precipitation', label: 'Precipitation' },
    { id: 'wind', label: 'Wind' },
    { id: 'airquality', label: 'Air Quality' },
    { id: 'humidity', label: 'Humidity' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div>
            {dailyForecast.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {dailyForecast.map((day, index) => (
                    <div key={index} className="text-center hover:bg-slate-700/50 rounded-2xl p-4 transition-colors">
                      <div className="text-slate-400 text-sm mb-2 font-medium">
                        {index === 0 ? 'Today' : formatDate(day.dt).split(',')[0]}
                      </div>
                      <div className={`text-4xl mb-3 ${getWeatherClass(day.weather[0].main)}`}>
                        {getWeatherIcon(day.weather[0].main)}
                      </div>
                      <div className="text-white text-xl font-bold mb-1">
                        {Math.round(day.main.temp_max || day.main.temp)}°
                      </div>
                      <div className="text-slate-400 text-lg">
                        {Math.round(day.main.temp_min || day.main.temp - 5)}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hourlyForecast.length > 0 && (
              <div>
                <h4 className="text-white text-lg font-semibold mb-4">Hourly Forecast</h4>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {hourlyForecast.map((hour, index) => (
                    <div key={index} className="flex-shrink-0 text-center bg-slate-700/30 rounded-xl p-4 min-w-[80px]">
                      <div className="text-slate-400 text-xs mb-2">
                        {index === 0 ? 'Now' : formatTime(hour.dt)}
                      </div>
                      <div className={`text-2xl mb-2 ${getWeatherClass(hour.weather[0].main)}`}>
                        {getWeatherIcon(hour.weather[0].main)}
                      </div>
                      <div className="text-white text-sm font-bold">
                        {Math.round(hour.main.temp)}°
                      </div>
                      <div className="text-slate-400 text-xs mt-1">
                        {Math.round(hour.pop * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'precipitation':
        return (
          <div className="space-y-6">
            <div className="bg-slate-700/30 rounded-2xl p-6">
              <h4 className="text-white text-lg font-semibold mb-4">💧 Precipitation Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">☔</div>
                  <div className="text-slate-400 text-sm">Chance of Rain</div>
                  <div className="text-white text-2xl font-bold">
                    {hourlyForecast.length > 0 ? Math.round(hourlyForecast[0].pop * 100) : 0}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌧️</div>
                  <div className="text-slate-400 text-sm">Rainfall Rate</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.rain ? `${weatherData.rain['1h'] || 0} mm/h` : '0 mm/h'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">☁️</div>
                  <div className="text-slate-400 text-sm">Cloud Cover</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.clouds?.all || 0}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-2xl p-6">
              <h5 className="text-white font-semibold mb-4">Next 12 Hours</h5>
              <div className="flex justify-between items-end h-32 gap-2">
                {hourlyForecast.slice(0, 12).map((hour, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-slate-400 mb-2">{Math.round(hour.pop * 100)}%</div>
                    <div 
                      className="bg-blue-500 w-full rounded-t min-h-[4px]"
                      style={{ height: `${Math.max((hour.pop * 100), 4)}%` }}
                    ></div>
                    <div className="text-xs text-slate-400 mt-2">
                      {index === 0 ? 'Now' : formatTime(hour.dt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'wind':
        return (
          <div className="space-y-6">
            <div className="bg-slate-700/30 rounded-2xl p-6">
              <h4 className="text-white text-lg font-semibold mb-4">💨 Wind Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">💨</div>
                  <div className="text-slate-400 text-sm">Wind Speed</div>
                  <div className="text-white text-2xl font-bold">
                    {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🧭</div>
                  <div className="text-slate-400 text-sm">Direction</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.wind?.deg ? `${weatherData.wind.deg}°` : 'N/A'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌪️</div>
                  <div className="text-slate-400 text-sm">Gusts</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.wind?.gust ? Math.round(weatherData.wind.gust * 3.6) : 0} km/h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-slate-400 text-sm">Pressure</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.main.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'airquality':
        return (
          <div className="space-y-6">
            <div className="bg-slate-700/30 rounded-2xl p-6">
              <h4 className="text-white text-lg font-semibold mb-4">🌬️ Air Quality Index</h4>
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-3 rounded-2xl bg-green-400/20 text-green-400 font-bold text-lg mb-2">
                  AQI: 45 - Good
                </div>
                <p className="text-slate-300">Air quality is good for outdoor activities</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-slate-600/30 rounded-xl p-4">
                  <div className="text-slate-400 text-sm">PM2.5</div>
                  <div className="text-white text-xl font-bold">12 μg/m³</div>
                </div>
                <div className="text-center bg-slate-600/30 rounded-xl p-4">
                  <div className="text-slate-400 text-sm">PM10</div>
                  <div className="text-white text-xl font-bold">24 μg/m³</div>
                </div>
                <div className="text-center bg-slate-600/30 rounded-xl p-4">
                  <div className="text-slate-400 text-sm">O₃</div>
                  <div className="text-white text-xl font-bold">45 μg/m³</div>
                </div>
                <div className="text-center bg-slate-600/30 rounded-xl p-4">
                  <div className="text-slate-400 text-sm">NO₂</div>
                  <div className="text-white text-xl font-bold">18 μg/m³</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'humidity':
        return (
          <div className="space-y-6">
            <div className="bg-slate-700/30 rounded-2xl p-6">
              <h4 className="text-white text-lg font-semibold mb-4">💧 Humidity Details</h4>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💧</div>
                <div className="text-4xl text-white font-bold mb-2">{weatherData.main.humidity}%</div>
                <div className="text-lg text-green-400">
                  {weatherData.main.humidity < 30 ? 'Dry' : 
                   weatherData.main.humidity <= 60 ? 'Comfortable' : 'Humid'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Dew Point</div>
                  <div className="text-white text-2xl font-bold">
                    {Math.round(weatherData.main.temp - ((100 - weatherData.main.humidity) / 5))}°C
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Comfort Level</div>
                  <div className="text-xl font-bold text-green-400">
                    {weatherData.main.humidity < 30 ? 'Dry' : 
                     weatherData.main.humidity <= 60 ? 'Comfortable' : 'Humid'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Visibility</div>
                  <div className="text-white text-2xl font-bold">
                    {weatherData.visibility ? Math.round(weatherData.visibility/1000) : 10} km
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
      {/* Tab Headers */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-yellow-500 text-slate-900'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};





export default WeatherTabs;
