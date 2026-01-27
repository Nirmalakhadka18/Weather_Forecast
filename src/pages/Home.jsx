import React, { useState, useEffect } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';
import OutfitSuggestions from '../components/OutfitSuggestions';
import MusicRecommendations from '../components/MusicRecommendations';
import ActivityRecommendations from '../components/ActivityRecommendations';
import WeatherAnimations from '../components/WeatherAnimations';
import MapLocationSelector from '../components/MapLocationSelector';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [error, setError] = useState('');
  const [showMapSelector, setShowMapSelector] = useState(true);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Use a free API key or demo mode
  const API_KEY = '895284fb2d2c50a520ea537456963d9c'; // Demo API key - replace with your own
  const UNSPLASH_API_KEY = 'demo'; // For now, we'll skip Unsplash

  // Demo data for testing (remove when you have real API key)
  const useDemoData = () => {
    const demoData = {
      name: "London",
      sys: { country: "GB" },
      main: {
        temp: 15,
        feels_like: 13,
        humidity: 65,
        pressure: 1013
      },
      weather: [{
        main: "Clouds",
        description: "partly cloudy"
      }],
      wind: { speed: 3.5 }
    };
    
    setWeatherData(demoData);
    setLocation("London");
    setLoading(false);
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const encodedCity = encodeURIComponent(city);
      
      // Fetch current weather
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;
      // Fetch 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric`;
      
      console.log('Fetching weather data for:', city);
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      if (!weatherResponse.ok) {
        if (weatherResponse.status === 401) {
          console.log('Invalid API key, using demo data');
          return useDemoData();
        } else if (weatherResponse.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else {
          throw new Error(`Weather service error (${weatherResponse.status}). Please try again later.`);
        }
      }
      
      const weatherData = await weatherResponse.json();
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;
      
      console.log('Weather data received:', weatherData);
      console.log('Forecast data received:', forecastData);
      
      setWeatherData(weatherData);
      setForecastData(forecastData);
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      
      if (err.message.includes('fetch')) {
        console.log('Network error, using demo data');
        return useDemoData();
      }
      
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBackgroundImage = async (cityName, weatherCondition) => {
    // Skip Unsplash API for now - you can enable this later with a valid API key
    return;
    
    try {
      const query = encodeURIComponent(`${cityName} ${weatherCondition} landscape`);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setBackgroundImage(data.results[0].urls.regular);
        }
      }
    } catch (err) {
      console.log('Failed to fetch background image:', err);
    }
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location.trim());
    } else {
      setError('Please enter a city name.');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError('');
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log('Got coordinates:', latitude, longitude);
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            
            const [weatherResponse, forecastResponse] = await Promise.all([
              fetch(weatherUrl),
              fetch(forecastUrl)
            ]);
            
            if (!weatherResponse.ok) {
              throw new Error(`Weather service error (${weatherResponse.status})`);
            }
            
            const weatherData = await weatherResponse.json();
            const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;
            
            setWeatherData(weatherData);
            setForecastData(forecastData);
            setLocation(weatherData.name);
            
          } catch (err) {
            console.error('Error fetching weather by location:', err);
            setError('Failed to get weather for your location. Please try entering a city name.');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Location access denied. Please enter a city name manually.');
          setLoading(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Please enter a city name.');
    }
  };

  // Test with a default city on component mount (for debugging)
  useEffect(() => {
    // Uncomment this line to test with a default city
    // fetchWeatherData('London');
  }, []);

  const getWeatherBackground = () => {
    if (!weatherData) return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';
    
    const condition = weatherData.weather[0].main.toLowerCase();
    const backgrounds = {
      'clear': 'bg-gradient-to-br from-blue-900 via-purple-900 to-slate-800',
      'rain': 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800',
      'clouds': 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900',
      'snow': 'bg-gradient-to-br from-slate-700 via-blue-800 to-slate-900'
    };
    
    return backgrounds[condition] || 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';
  };

  const handleMapLocationSelect = async (locationName, lat, lng) => {
    setLocation(locationName);
    setSelectedCoordinates({ lat, lng });
    setShowMapSelector(false);
    
    // Fetch weather for selected coordinates
    setLoading(true);
    setError('');
    
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;
      
      setWeatherData(weatherData);
      setForecastData(forecastData);
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      setShowMapSelector(false);
      fetchWeatherData(location.trim());
    } else {
      setError('Please enter a city name.');
    }
  };

  const resetToMapSelector = () => {
    setShowMapSelector(true);
    setWeatherData(null);
    setForecastData(null);
    setLocation('');
    setError('');
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${getWeatherBackground()} relative`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: backgroundImage ? 'overlay' : 'normal'
      }}
    >
      {/* Weather Animations */}
      {weatherData && (
        <WeatherAnimations 
          weatherCondition={weatherData.weather[0].description} 
          className="z-0"
        />
      )}

      {/* Background overlay */}
      <div className="min-h-screen bg-black/40 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <header className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-bold text-white mb-2 sm:mb-4 animate-fadeIn leading-tight">
              🌈 WeatherMood
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 animate-fadeIn px-4">
              Discover your perfect day based on the weather
            </p>
          </header>

          {/* Location Selection - Show map initially or when no weather data */}
          {showMapSelector && !weatherData && (
            <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 location-selector-container px-2 sm:px-0">
              {/* City Input Option - At the top */}
              <div className="mb-6 sm:mb-8 text-center">
                <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
                  <p className="text-white/80 mb-3 sm:mb-4 text-base sm:text-lg font-medium">Search by city name:</p>
                  <form onSubmit={handleInputLocationSubmit} className="w-full max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city name..."
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-white/95"
                        style={{ fontSize: '16px' }} // Prevents zoom on iOS
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 text-white rounded-lg sm:rounded-xl font-semibold text-base transition-colors min-h-[44px] flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Searching...
                          </>
                        ) : (
                          <>
                            🔍 <span className="ml-2 hidden xs:inline">Search</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {error && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="map-location-selector">
                <MapLocationSelector 
                  onLocationSelect={handleMapLocationSelect}
                  className="animate-fadeIn"
                />
              </div>
              
              {/* Alternative text below the map */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-white/60 text-xs sm:text-sm px-4">Or tap anywhere on the map above to select a location</p>
              </div>
            </div>
          )}

          {/* Compact Location Input - Show when weather data is loaded */}
          {!showMapSelector && weatherData && (
            <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
              <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-fadeIn border border-slate-700/50 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city name..."
                    className="flex-1 px-3 sm:px-4 py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-white/95"
                    style={{ fontSize: '16px' }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleInputLocationSubmit}
                      disabled={loading}
                      className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors min-h-[44px]"
                    >
                      {loading ? 'Searching...' : '🔍'}
                      <span className="ml-1 hidden sm:inline">Search</span>
                    </button>
                    <button
                      onClick={resetToMapSelector}
                      className="px-3 sm:px-4 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors min-h-[44px]"
                    >
                      🗺️
                      <span className="ml-1 hidden sm:inline">Map</span>
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs sm:text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Weather Display and other components */}
          <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
            <WeatherDisplay weatherData={weatherData} forecastData={forecastData} loading={loading} />
            
            {weatherData && (
              <>
                <OutfitSuggestions weatherData={weatherData} />
                <MusicRecommendations weatherData={weatherData} />
                <ActivityRecommendations weatherData={weatherData} />
              </>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-8 sm:mt-12 lg:mt-16 text-white/70 px-4">
            <p className="text-xs sm:text-sm">Made with ❤️ for weather enthusiasts</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;

