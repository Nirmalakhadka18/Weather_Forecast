import React, { useState, useEffect } from 'react';

const MusicRecommendations = ({ weatherData }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  if (!weatherData) return null;

  const getMusicPlaylists = (condition, temp) => {
    const playlists = [];

    if (condition.includes('clear') || condition.includes('sunny')) {
      playlists.push(
        { 
          name: 'Sunny Day Vibes', 
          genre: 'Pop/Indie', 
          emoji: '☀️', 
          description: 'Upbeat tracks for bright weather',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX0XUsuxWHRQd',
          embedId: '37i9dQZF1DX0XUsuxWHRQd'
        },
        { 
          name: 'Summer Hits', 
          genre: 'Dance/Electronic', 
          emoji: '🌞', 
          description: 'Feel-good summer anthems',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX0yEZaMOXNA3',
          embedId: '37i9dQZF1DX0yEZaMOXNA3'
        }
      );
    } else if (condition.includes('rain')) {
      playlists.push(
        { 
          name: 'Rainy Day Jazz', 
          genre: 'Jazz/Blues', 
          emoji: '🌧️', 
          description: 'Smooth jazz for cozy moments',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX0SM0LYsmbMT',
          embedId: '37i9dQZF1DX0SM0LYsmbMT'
        },
        { 
          name: 'Lo-fi Rain', 
          genre: 'Lo-fi/Ambient', 
          emoji: '🎵', 
          description: 'Relaxing lo-fi beats',
          spotifyUri: 'spotify:playlist:37i9dQZF1DWWQRwui0ExPn',
          embedId: '37i9dQZF1DWWQRwui0ExPn'
        }
      );
    } else if (condition.includes('cloud')) {
      playlists.push(
        { 
          name: 'Cloudy Day Chill', 
          genre: 'Chillout/Ambient', 
          emoji: '☁️', 
          description: 'Calm and peaceful vibes',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX4WYpdgoIcn6',
          embedId: '37i9dQZF1DX4WYpdgoIcn6'
        },
        { 
          name: 'Indie Rock', 
          genre: 'Indie/Rock', 
          emoji: '🎸', 
          description: 'Alternative rock classics',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX26DKvjp0s9M',
          embedId: '37i9dQZF1DX26DKvjp0s9M'
        }
      );
    } else if (condition.includes('snow')) {
      playlists.push(
        { 
          name: 'Winter Classics', 
          genre: 'Classical/Orchestral', 
          emoji: '❄️', 
          description: 'Beautiful classical pieces',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO',
          embedId: '37i9dQZF1DX4sWSpwq3LiO'
        },
        { 
          name: 'Cozy Folk', 
          genre: 'Folk/Country', 
          emoji: '🔥', 
          description: 'Warm folk songs',
          spotifyUri: 'spotify:playlist:37i9dQZF1DX0Tkc6f9qocx',
          embedId: '37i9dQZF1DX0Tkc6f9qocx'
        }
      );
    }

    return playlists;
  };

  const playlists = getMusicPlaylists(weatherData.weather[0].description, weatherData.main.temp);

  useEffect(() => {
    // Auto-select first playlist based on weather
    if (playlists.length > 0) {
      setSelectedPlaylist(playlists[0]);
    }
  }, [weatherData]);

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Note: Due to Spotify's restrictions, we can't control embedded player directly
    // This is mainly for UI feedback
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fadeIn border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        🎵 Mood-Based Music
      </h3>
      
      {/* Playlist Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
        {playlists.map((playlist, index) => (
          <div 
            key={index} 
            className={`music-card rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 cursor-pointer transition-all border ${
              selectedPlaylist?.name === playlist.name 
                ? 'bg-blue-600 text-white shadow-lg scale-105 border-blue-400' 
                : 'bg-slate-700/40 hover:bg-slate-600/50 border-slate-600/30 text-slate-200'
            }`}
            onClick={() => handlePlaylistSelect(playlist)}
          >
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 text-center">{playlist.emoji}</div>
            <h4 className={`text-xs sm:text-sm font-semibold mb-1 text-center ${
              selectedPlaylist?.name === playlist.name ? 'text-white' : 'text-slate-200'
            }`}>
              {playlist.name}
            </h4>
            <p className={`text-xs text-center ${
              selectedPlaylist?.name === playlist.name ? 'text-blue-100' : 'text-slate-400'
            }`}>
              {playlist.genre}
            </p>
            <p className={`text-xs mt-1 text-center hidden lg:block ${
              selectedPlaylist?.name === playlist.name ? 'text-blue-100' : 'text-slate-500'
            }`}>
              {playlist.description}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive Spotify Player */}
      {selectedPlaylist && (
        <div className="mb-4 sm:mb-6">
          {/* Player Header with Current Selection */}
          <div className="flex items-center justify-between mb-3 bg-slate-700/40 rounded-xl p-3 border border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.964-.335.077-.67-.133-.746-.469-.077-.335.132-.67.469-.746 3.809-.871 7.077-.496 9.713 1.115.293.18.385.563.206.857z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">Now Playing</h4>
                <p className="text-slate-300 text-xs sm:text-sm flex items-center">
                  {selectedPlaylist.emoji} {selectedPlaylist.name}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-600/40 shadow-xl">
            {/* Mobile-friendly iframe container */}
            <div className="relative w-full bg-black/40 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.embedId}?utm_source=generator&theme=0`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowtransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ 
                  minHeight: '200px',
                  maxHeight: '400px'
                }}
              ></iframe>
            </div>
            
            {/* Fallback for very small screens */}
            <div className="sm:hidden mt-4 text-center">
              <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/30">
                <p className="text-slate-300 text-sm mb-3 font-medium">Experience the full player</p>
                <button 
                  onClick={() => window.open(`https://open.spotify.com/playlist/${selectedPlaylist.embedId}`, '_blank')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-4 py-3 rounded-lg text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Open in Spotify App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather-Music Connection Info */}
      <div className="bg-slate-700/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-600/30">
        <h5 className="font-semibold text-white mb-2 text-sm sm:text-base flex items-center">
          <span className="mr-2">🌤️</span>
          Why this music?
        </h5>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)} weather 
          at {Math.round(weatherData.main.temp)}°C creates the perfect atmosphere for{' '}
          {selectedPlaylist ? selectedPlaylist.genre.toLowerCase() : 'relaxing music'}. 
          This playlist is specially curated to match your current weather mood!
        </p>
      </div>
    </div>
  );
};

export default MusicRecommendations;