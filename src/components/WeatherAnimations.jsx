import React from 'react';

const WeatherAnimations = ({ weatherCondition, className = "" }) => {
  if (!weatherCondition) return null;
  
  const condition = weatherCondition.toLowerCase();

  const RainAnimation = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-blue-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
            height: `${10 + Math.random() * 10}px`,
            animation: `rainfall ${0.5 + Math.random() * 0.5}s linear infinite`
          }}
        />
      ))}
    </div>
  );

  const SnowAnimation = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-80 text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            animation: `snowfall ${3 + Math.random() * 2}s linear infinite`
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );

  const CloudAnimation = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-gray-400 opacity-30 text-4xl"
          style={{
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 50}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            animation: `cloudFloat ${8 + Math.random() * 4}s ease-in-out infinite`
          }}
        >
          ☁️
        </div>
      ))}
    </div>
  );

  const SunAnimation = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div 
        className="absolute top-10 right-10 text-yellow-400 opacity-40 text-6xl"
        style={{
          animation: 'sunGlow 3s ease-in-out infinite'
        }}
      >
        ☀️
      </div>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`,
            animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`
          }}
        />
      ))}
    </div>
  );

  // Choose animation based on weather condition
  const renderAnimation = () => {
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
      return <RainAnimation />;
    } else if (condition.includes('snow') || condition.includes('blizzard')) {
      return <SnowAnimation />;
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      return <SunAnimation />;
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      return <CloudAnimation />;
    }
    return null;
  };

  return renderAnimation();
};

export default WeatherAnimations;
