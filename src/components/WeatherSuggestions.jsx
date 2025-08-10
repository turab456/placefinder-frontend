import React, { useState, useEffect } from 'react';

// Mock weather API response (replace with real API call in production)
const fetchWeather = async (location) => {
  // Simulate API call based on location or geolocation
  // Example: Use OpenWeatherMap API with endpoint like `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}`
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock weather conditions based on location or random for demo
      const conditions = ['Sunny', 'Rainy', 'Cold'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      resolve({ condition: randomCondition, temperature: 20 }); // Example temperature
    }, 1000);
  });
};

// Sample place data based on weather (replace with API data)
const weatherPlaces = {
  Sunny: [
    { id: 1, name: 'SkyHigh Rooftop', category: 'Rooftop Cafe', rating: 4.8, image: 'https://via.placeholder.com/400x250?text=SkyHigh+Rooftop' },
    { id: 2, name: 'Sunset Park', category: 'Outdoor Park', rating: 4.6, image: 'https://via.placeholder.com/400x250?text=Sunset+Park' },
  ],
  Rainy: [
    { id: 3, name: 'Cozy Haven Cafe', category: 'Indoor Cafe', rating: 4.7, image: 'https://via.placeholder.com/400x250?text=Cozy+Haven+Cafe' },
    { id: 4, name: 'The Covered Lounge', category: 'Lounge', rating: 4.5, image: 'https://via.placeholder.com/400x250?text=Covered+Lounge' },
  ],
  Cold: [
    { id: 5, name: 'Warm Hearth Lounge', category: 'Heated Lounge', rating: 4.9, image: 'https://via.placeholder.com/400x250?text=Warm+Hearth+Lounge' },
    { id: 6, name: 'Soup & Soul Bistro', category: 'Restaurant', rating: 4.7, image: 'https://via.placeholder.com/400x250?text=Soup+%26+Soul+Bistro' },
  ],
};

// Weather emoji mapping
const weatherEmojis = {
  Sunny: '☀️',
  Rainy: '🌧️',
  Cold: '❄️',
};

const WeatherSuggestions = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather based on browser geolocation or location input
    const getWeather = async () => {
      try {
        // Example: Use browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const weatherData = await fetchWeather({ lat: latitude, lon: longitude });
              setWeather(weatherData);
              setLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fallback to mock data or default location
              const weatherData =  fetchWeather('default');
              setWeather(weatherData);
              setLoading(false);
            }
          );
        } else {
          // Fallback if geolocation is not supported
          const weatherData = await fetchWeather('default');
          setWeather(weatherData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  return (
    <section className="py-8 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">
          Weather-Based Picks {weather && `${weatherEmojis[weather.condition]} ${weather.condition}`}
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading weather recommendations...</p>
        ) : (
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
            {weather && weatherPlaces[weather.condition]?.length > 0 ? (
              weatherPlaces[weather.condition].map((place) => (
                <div
                  key={place.id}
                  className="min-w-[320px] max-w-[320px] bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-indigo-900">{place.name}</h3>
                    <p className="text-sm text-gray-600">{place.category}</p>
                    <div className="flex items-center mt-3">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                      <span className="ml-2 text-gray-700 text-base">{place.rating}</span>
                    </div>
                    <button className="mt-4 w-full bg-sky-500 text-white py-2.5 rounded-full hover:bg-indigo-700 transition duration-300 text-sm font-medium">
                      Explore Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recommendations available for this weather.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherSuggestions;