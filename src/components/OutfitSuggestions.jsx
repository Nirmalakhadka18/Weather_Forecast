import React from 'react';

const OutfitSuggestions = ({ weatherData }) => {
  if (!weatherData) return null;

  const getOutfitSuggestions = (temp, condition, windSpeed) => {
    const suggestions = {
      accessories: [],
      clothing: [],
      footwear: [],
      tips: []
    };

    // Temperature based suggestions
    if (temp < 0) {
      suggestions.clothing = ['Heavy winter coat', 'Thermal underwear', 'Wool sweater', 'Warm scarf'];
      suggestions.footwear = ['Insulated boots', 'Wool socks'];
      suggestions.accessories = ['Winter hat', 'Insulated gloves', 'Face mask'];
    } else if (temp < 10) {
      suggestions.clothing = ['Jacket or coat', 'Long pants', 'Sweater or hoodie'];
      suggestions.footwear = ['Closed shoes', 'Regular socks'];
      suggestions.accessories = ['Light scarf', 'Gloves'];
    } else if (temp < 20) {
      suggestions.clothing = ['Light jacket', 'Long pants or jeans', 'Long sleeve shirt'];
      suggestions.footwear = ['Sneakers', 'Light shoes'];
      suggestions.accessories = ['Light jacket'];
    } else if (temp < 30) {
      suggestions.clothing = ['T-shirt', 'Light pants or shorts', 'Thin fabric'];
      suggestions.footwear = ['Sneakers', 'Canvas shoes'];
      suggestions.accessories = ['Sunglasses', 'Cap'];
    } else {
      suggestions.clothing = ['Light t-shirt', 'Shorts', 'Breathable fabric'];
      suggestions.footwear = ['Sandals', 'Breathable shoes'];
      suggestions.accessories = ['Sunglasses', 'Hat', 'Sunscreen'];
    }

    // Weather condition adjustments
    if (condition.includes('rain') || condition.includes('drizzle')) {
      suggestions.accessories.push('Umbrella', 'Waterproof jacket');
      suggestions.footwear = ['Waterproof boots', 'Rain boots'];
      suggestions.tips.push('Stay dry and carry an umbrella');
    }

    if (condition.includes('snow')) {
      suggestions.accessories.push('Warm hat', 'Snow gloves');
      suggestions.footwear = ['Snow boots', 'Warm socks'];
      suggestions.tips.push('Layer up and watch for icy surfaces');
    }

    if (windSpeed > 10) {
      suggestions.accessories.push('Windbreaker');
      suggestions.tips.push('Wear wind-resistant clothing');
    }

    return suggestions;
  };

  const temp = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].description;
  const windSpeed = weatherData.wind.speed;
  
  const outfit = getOutfitSuggestions(temp, condition, windSpeed);

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fadeIn border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        👕 Outfit Suggestions
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-700/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
          <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            👔 Clothing
          </h4>
          <ul className="space-y-2">
            {outfit.clothing.map((item, index) => (
              <li key={index} className="flex items-center text-slate-300 text-sm sm:text-base">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-700/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
          <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            👟 Footwear
          </h4>
          <ul className="space-y-2">
            {outfit.footwear.map((item, index) => (
              <li key={index} className="flex items-center text-slate-300 text-sm sm:text-base">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-700/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
          <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            🎒 Accessories
          </h4>
          <ul className="space-y-2">
            {outfit.accessories.map((item, index) => (
              <li key={index} className="flex items-center text-slate-300 text-sm sm:text-base">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {outfit.tips.length > 0 && (
        <div className="mt-4 sm:mt-6 bg-amber-900/30 border border-amber-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <h4 className="text-base sm:text-lg font-semibold text-amber-300 mb-2">💡 Weather Tips</h4>
          <ul className="space-y-1">
            {outfit.tips.map((tip, index) => (
              <li key={index} className="text-amber-200 text-sm sm:text-base">• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestions;
