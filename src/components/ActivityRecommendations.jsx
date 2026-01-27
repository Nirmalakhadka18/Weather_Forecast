import React from 'react';

const ActivityRecommendations = ({ weatherData }) => {
  if (!weatherData) return null;

  const getActivitySuggestions = (condition, temp, windSpeed) => {
    const activities = {
      outdoor: [],
      indoor: [],
      travel: []
    };

    // Convert condition to lowercase for better matching
    const lowerCondition = condition.toLowerCase();

    // Weather-based outdoor activities
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny') || lowerCondition.includes('fair')) {
      activities.outdoor = [
        { name: 'Beach Day', icon: '🏖️', description: 'Perfect for sunbathing and swimming' },
        { name: 'Hiking', icon: '🥾', description: 'Great visibility and pleasant weather' },
        { name: 'Picnic', icon: '🧺', description: 'Ideal for outdoor dining' },
        { name: 'Photography', icon: '📸', description: 'Golden hour lighting' }
      ];
      activities.travel = [
        { name: 'City Walking Tour', icon: '🚶', description: 'Explore the city on foot' },
        { name: 'Outdoor Markets', icon: '🛒', description: 'Visit local farmers markets' },
        { name: 'Rooftop Bars', icon: '🍹', description: 'Enjoy drinks with a view' }
      ];
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
      activities.indoor = [
        { name: 'Museum Visit', icon: '🏛️', description: 'Explore art and culture indoors' },
        { name: 'Cozy Café', icon: '☕', description: 'Perfect weather for hot drinks' },
        { name: 'Movie Theater', icon: '🎬', description: 'Great day for cinema' },
        { name: 'Book Reading', icon: '📚', description: 'Relaxing indoor activity' }
      ];
      activities.travel = [
        { name: 'Shopping Malls', icon: '🛍️', description: 'Indoor shopping experience' },
        { name: 'Underground Tours', icon: '🚇', description: 'Explore subway art and culture' },
        { name: 'Indoor Markets', icon: '🏪', description: 'Covered market exploration' }
      ];
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('blizzard')) {
      activities.outdoor = [
        { name: 'Skiing/Snowboarding', icon: '⛷️', description: 'Perfect snow conditions' },
        { name: 'Ice Skating', icon: '⛸️', description: 'Winter sports fun' },
        { name: 'Snow Photography', icon: '📷', description: 'Capture winter beauty' }
      ];
      activities.indoor = [
        { name: 'Hot Chocolate', icon: '☕', description: 'Warm up with hot drinks' },
        { name: 'Fireplace Reading', icon: '📖', description: 'Cozy indoor time' }
      ];
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast') || lowerCondition.includes('partly')) {
      // Cloudy weather - mixed activities
      activities.outdoor = [
        { name: 'Light Walking', icon: '🚶‍♂️', description: 'Perfect for a casual stroll' },
        { name: 'Outdoor Sports', icon: '⚽', description: 'Great for activities without direct sun' },
        { name: 'Garden Visit', icon: '🌺', description: 'Explore botanical gardens' }
      ];
      activities.indoor = [
        { name: 'Art Gallery', icon: '🎨', description: 'Indoor cultural experience' },
        { name: 'Shopping', icon: '🛒', description: 'Perfect for retail therapy' }
      ];
      activities.travel = [
        { name: 'City Tour', icon: '🏙️', description: 'Explore urban attractions' },
        { name: 'Local Markets', icon: '🥕', description: 'Visit covered markets' }
      ];
    } else {
      // Default activities for any other weather
      activities.outdoor = [
        { name: 'Walking', icon: '🚶', description: 'Light outdoor activity' },
        { name: 'Sightseeing', icon: '👀', description: 'Explore local attractions' }
      ];
      activities.indoor = [
        { name: 'Café Visit', icon: '☕', description: 'Enjoy indoor refreshments' },
        { name: 'Local Attractions', icon: '🏛️', description: 'Visit indoor venues' }
      ];
      activities.travel = [
        { name: 'Local Exploration', icon: '🗺️', description: 'Discover nearby places' }
      ];
    }

    // Temperature-based suggestions (add to existing activities)
    if (temp > 25) {
      if (activities.outdoor.length === 0) activities.outdoor = [];
      activities.outdoor.push(
        { name: 'Swimming', icon: '🏊', description: 'Cool off in the water' },
        { name: 'Ice Cream Hunt', icon: '🍦', description: 'Perfect weather for cold treats' }
      );
    } else if (temp < 10) {
      if (activities.indoor.length === 0) activities.indoor = [];
      activities.indoor.push(
        { name: 'Hot Spa', icon: '🧘', description: 'Warm up and relax' },
        { name: 'Cooking', icon: '👨‍🍳', description: 'Make warm comfort food' }
      );
    }

    // Wind-based adjustments
    if (windSpeed && windSpeed > 10) {
      // Add wind-specific activities
      if (activities.outdoor.length === 0) activities.outdoor = [];
      activities.outdoor.push({ name: 'Kite Flying', icon: '🪁', description: 'Great wind for kites' });
    }

    return activities;
  };

  const activities = getActivitySuggestions(
    weatherData.weather[0].description,
    weatherData.main.temp,
    weatherData.wind?.speed || 0
  );

  const ActivityCard = ({ activity }) => (
    <div className="activity-card bg-slate-700/40 hover:bg-slate-600/50 rounded-2xl p-4 sm:p-6 cursor-pointer border border-slate-600/30 transition-all">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">{activity.icon}</div>
      <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{activity.name}</h4>
      <p className="text-xs sm:text-sm text-slate-300">{activity.description}</p>
    </div>
  );

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fadeIn border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        ✈️ Activity Recommendations
      </h3>
      
      {activities.outdoor.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            🌟 Outdoor Activities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {activities.outdoor.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {activities.indoor.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            🏠 Indoor Activities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {activities.indoor.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {activities.travel.length > 0 && (
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3 sm:mb-4 flex items-center">
            🗺️ Local Exploration
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activities.travel.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityRecommendations;
