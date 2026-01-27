import React from 'react';
import WeatherTabs from './WeatherTabs';
import WeatherMap from './WeatherMap';

const WeatherDisplay = ({ weatherData, forecastData, loading }) => {
  if (loading) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 text-center animate-fadeIn border border-slate-700/50">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-slate-300">Fetching weather data...</p>
      </div>
    );
  }

  if (!weatherData) return null;

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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Weather Card */}
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fadeIn border border-slate-700/50 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Main Weather Info */}
          <div className="flex-1 w-full">
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
              <div className={`text-5xl sm:text-6xl lg:text-7xl ${getWeatherClass(weatherData.weather[0].main)} flex-shrink-0`}>
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-1 sm:mb-2">
                  {Math.round(weatherData.main.temp)}°
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1">
                  {weatherData.weather[0].main}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300">
                  Feels like {Math.round(weatherData.main.feels_like)}°
                </p>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 capitalize leading-relaxed">
                {weatherData.weather[0].description}. The high will be {Math.round(weatherData.main.temp_max || weatherData.main.temp)}° on this {weatherData.main.humidity > 70 ? 'humid' : 'dry'} day.
              </p>
            </div>

            {/* Weather Metrics - Mobile optimized grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-green-400 text-xs sm:text-sm font-medium mb-1">Air quality</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">45</div>
              </div>
              
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Wind</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">{Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h</div>
              </div>
              
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Humidity</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">{weatherData.main.humidity}%</div>
              </div>
              
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Visibility</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">{weatherData.visibility ? Math.round(weatherData.visibility/1000) : 10} km</div>
              </div>
              
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Pressure</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">{weatherData.main.pressure} mb</div>
              </div>
              
              <div className="text-center bg-slate-700/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Dew point</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-bold">{Math.round(weatherData.main.temp - 5)}°</div>
              </div>
            </div>
          </div>

          {/* Right Side - Mini Map */}
          <div className="w-full lg:w-80 h-40 sm:h-48 lg:h-64 mt-4 lg:mt-0">
            <WeatherMap weatherData={weatherData} className="h-full" />
          </div>
        </div>
      </div>

      {/* Weather Tabs Component */}
      <WeatherTabs weatherData={weatherData} forecastData={forecastData} />
    </div>
  );
};

export default WeatherDisplay;

