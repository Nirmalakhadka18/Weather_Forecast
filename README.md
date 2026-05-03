# 🌈 WeatherMood

> A smart weather app that goes beyond forecasts — it tells you what to wear, what to listen to, and what to do based on real-time weather conditions.

🚀 **Live Demo:** [https://weather-forecast-fk26.onrender.com](https://weather-forecast-fk26.onrender.com)

---

## 📸 Preview

![WeatherMood App](https://weather-forecast-fk26.onrender.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌡️ **Real-time Weather** | Live weather data using OpenWeatherMap API |
| 🗺️ **Interactive Map** | Click anywhere on the map to get weather for that location |
| 👕 **Outfit Suggestions** | Smart clothing recommendations based on temperature & conditions |
| 🎵 **Music Recommendations** | Curated Spotify playlists matched to your weather mood |
| ✈️ **Activity Ideas** | Outdoor, indoor & travel suggestions based on weather |
| 📅 **5-Day Forecast** | Extended forecast with hourly breakdown |
| 🌬️ **Weather Metrics** | Wind speed, humidity, pressure, visibility, dew point |
| 🎨 **Dynamic Backgrounds** | UI theme changes with weather conditions |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

**Frontend**
- [React 19](https://react.dev/) — UI library
- [Vite 7](https://vitejs.dev/) — Build tool & dev server
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [React Leaflet](https://react-leaflet.js.org/) — Interactive maps
- [Leaflet.js](https://leafletjs.com/) — Map rendering

**APIs**
- [OpenWeatherMap API](https://openweathermap.org/api) — Weather data & 5-day forecast
- [Spotify Embed API](https://developer.spotify.com/documentation/embeds) — Music playlists

**Deployment**
- [Render](https://render.com/) — Static site hosting

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/weather-forecast.git
cd weather-forecast

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── WeatherDisplay.jsx        # Main weather card with metrics
│   ├── WeatherTabs.jsx           # Hourly & forecast tabs
│   ├── WeatherMap.jsx            # Mini map on weather card
│   ├── MapLocationSelector.jsx   # Interactive map for location picking
│   ├── OutfitSuggestions.jsx     # Clothing recommendations
│   ├── MusicRecommendations.jsx  # Spotify playlist integration
│   ├── ActivityRecommendations.jsx # Activity ideas by weather
│   └── WeatherAnimations.jsx     # Weather-based UI animations
├── pages/
│   └── Home.jsx                  # Main page & API logic
├── App.jsx
└── main.jsx
```

---

## 🧠 How It Works

1. User selects a location via the **interactive map** or **city search**
2. App fetches **real-time weather** from OpenWeatherMap API
3. Based on temperature, condition & wind speed:
   - **Outfit engine** suggests clothing, footwear & accessories
   - **Music engine** picks a matching Spotify playlist genre
   - **Activity engine** recommends outdoor/indoor/travel activities
4. UI **dynamically changes** background gradient to match weather

---

## 🌍 Deployment

This app is deployed as a **Static Site** on Render.

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Publish Directory | `dist` |

---

## 📄 License

MIT License — feel free to use, modify and distribute.

---

## 🙋‍♂️ Author

Built with ❤️ by [Your Name](https://github.com/your-username)

⭐ Star this repo if you found it useful!
