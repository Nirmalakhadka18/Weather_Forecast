import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker = ({ onLocationSelect, selectedPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });

  return selectedPosition ? (
    <Marker position={selectedPosition} />
  ) : null;
};

const MapLocationSelector = ({ onLocationSelect, className = "" }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = useCallback(async (lat, lng) => {
    setSelectedPosition([lat, lng]);
    setIsLoading(true);
    
    try {
      // Reverse geocoding to get city name
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=895284fb2d2c50a520ea537456963d9c`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const locationName = data[0].name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          onLocationSelect(locationName, lat, lng);
        }
      }
    } catch (error) {
      console.error('Error getting location name:', error);
      onLocationSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng);
    } finally {
      setIsLoading(false);
    }
  }, [onLocationSelect]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <div className={`bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-700/50 shadow-xl ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">🗺️ Select Location</h3>
        <p className="text-slate-300 text-sm mb-4 px-2">
          Tap anywhere on the map to get weather for that location
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <button
            onClick={handleCurrentLocation}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors min-h-[44px] text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Getting Location...
              </>
            ) : (
              '📍 Use My Location'
            )}
          </button>
          
          {selectedPosition && (
            <div className="px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-medium">
              ✓ Location Selected
            </div>
          )}
        </div>
      </div>

      <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-600/50 shadow-lg">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          touchZoom={true}
          dragging={true}
          tap={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <LocationPicker 
            onLocationSelect={handleLocationSelect}
            selectedPosition={selectedPosition}
          />
        </MapContainer>
        
        <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs max-w-40 sm:max-w-48">
          <div className="font-semibold mb-1">How to use:</div>
          <div>• Tap anywhere on map</div>
          <div>• Use location button</div>
          <div>• Weather loads automatically</div>
        </div>
      </div>
    </div>
  );
};

export default MapLocationSelector;
