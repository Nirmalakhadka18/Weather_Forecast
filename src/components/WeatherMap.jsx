import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherMap = ({ weatherData, className = "" }) => {
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Default to London
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      setCoordinates([weatherData.coord.lat, weatherData.coord.lon]);
      
      // Create custom weather icon
      const condition = weatherData.weather[0].main.toLowerCase();
      const iconHtml = getWeatherIconHtml(condition);
      
      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-weather-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
      });
      
      setWeatherIcon(customIcon);
    }
  }, [weatherData]);

  const getWeatherIconHtml = (condition) => {
    let emoji = '🌤️';
    let bgColor = '#3B82F6';
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      emoji = '☀️';
      bgColor = '#F59E0B';
    } else if (condition.includes('rain')) {
      emoji = '🌧️';
      bgColor = '#3B82F6';
    } else if (condition.includes('snow')) {
      emoji = '❄️';
      bgColor = '#E5E7EB';
    } else if (condition.includes('cloud')) {
      emoji = '☁️';
      bgColor = '#6B7280';
    } else if (condition.includes('thunder')) {
      emoji = '⛈️';
      bgColor = '#7C3AED';
    }
    
    return `
      <div style="
        background: ${bgColor};
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        border: 2px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `;
  };

  const getTemperatureColor = (temp) => {
    if (temp < 0) return '#3B82F6'; // Blue for freezing
    if (temp < 10) return '#06B6D4'; // Cyan for cold
    if (temp < 20) return '#10B981'; // Green for mild
    if (temp < 30) return '#F59E0B'; // Yellow for warm
    return '#EF4444'; // Red for hot
  };

  if (!weatherData) {
    return (
      <div className={`bg-slate-700/50 rounded-2xl flex items-center justify-center border border-slate-600/50 ${className}`}>
        <div className="text-center p-8">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-slate-300 text-sm">Weather Map</p>
          <p className="text-slate-400 text-xs">Search for a location to see the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-600/50 ${className}`}>
      <div className="absolute top-2 left-2 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">{weatherData.name}</div>
        <div style={{ color: getTemperatureColor(weatherData.main.temp) }}>
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div>
      
      <MapContainer
        center={coordinates}
        zoom={10}
        style={{ height: '100%', width: '100%', minHeight: '200px' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Weather overlay - you can add weather tiles here */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=895284fb2d2c50a520ea537456963d9c`}
          opacity={0.6}
          attribution="Weather data &copy; OpenWeatherMap"
        />
        
        {weatherIcon && (
          <Marker position={coordinates} icon={weatherIcon}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">
                    {weatherData.weather[0].main === 'Clear' ? '☀️' :
                     weatherData.weather[0].main === 'Rain' ? '🌧️' :
                     weatherData.weather[0].main === 'Snow' ? '❄️' :
                     weatherData.weather[0].main === 'Clouds' ? '☁️' :
                     weatherData.weather[0].main === 'Thunderstorm' ? '⛈️' : '🌤️'}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{weatherData.name}</h3>
                  <p className="text-slate-600 capitalize">{weatherData.weather[0].description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-slate-700">Temperature</div>
                    <div className="text-xl font-bold" style={{ color: getTemperatureColor(weatherData.main.temp) }}>
                      {Math.round(weatherData.main.temp)}°C
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-700">Feels like</div>
                    <div className="text-lg text-slate-600">
                      {Math.round(weatherData.main.feels_like)}°C
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-700">Humidity</div>
                    <div className="text-lg text-slate-600">{weatherData.main.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-700">Wind</div>
                    <div className="text-lg text-slate-600">{Math.round(weatherData.wind?.speed * 3.6 || 0)} km/h</div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500 text-center">
                    Coordinates: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-2 right-2 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
        <div className="font-semibold mb-1">Temperature Layer</div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Cold</span>
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Mild</span>
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Hot</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
