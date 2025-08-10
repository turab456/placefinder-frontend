import React, { useState, useEffect } from 'react';

// Sample data for hidden gems (replace with API data)
const hiddenGems = [
  {
    id: 1,
    name: 'Secret Garden Cafe',
    category: 'Food',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200?text=Secret+Garden+Cafe',
    tags: ['#Cozy', '#Budget'],
    aiBadge: '🌟 AI Pick',
  },
  {
    id: 2,
    name: 'Underground Art Hub',
    category: 'Hangouts',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200?text=Underground+Art+Hub',
    tags: ['#Artistic', '#Night View'],
    aiBadge: '✨ Underrated',
  },
  {
    id: 3,
    name: 'Moonlit Rooftop',
    category: 'Date Spots',
    rating: 4.9,
    image: 'https://via.placeholder.com/300x200?text=Moonlit+Rooftop',
    tags: ['#Romantic', '#Night View'],
    aiBadge: '🌟 AI Pick',
  },
  {
    id: 4,
    name: 'Hidden Speakeasy',
    category: 'Drinks',
    rating: 4.6,
    image: 'https://via.placeholder.com/300x200?text=Hidden+Speakeasy',
    tags: ['#Cozy', '#Night View'],
    aiBadge: '✨ Underrated',
  },
  {
    id: 5,
    name: 'Rustic Bistro',
    category: 'Food',
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200?text=Rustic+Bistro',
    tags: ['#Cozy', '#Budget'],
    aiBadge: '🌟 AI Pick',
  },
  {
    id: 6,
    name: 'Twilight Lounge',
    category: 'Date Spots',
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200?text=Twilight+Lounge',
    tags: ['#Romantic', '#Night View'],
    aiBadge: '✨ Underrated',
  },
];

const HiddenGems = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedGems, setDisplayedGems] = useState(hiddenGems);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: NYC

  const categories = ['All', 'Food', 'Drinks', 'Hangouts', 'Date Spots'];

  // Fetch user location (mocked for now, replace with geolocation or API)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error('Geolocation not available');
        }
      );
    }
  }, []);

  // Filter gems based on category
  const filteredGems = selectedCategory === 'All'
    ? displayedGems
    : displayedGems.filter((gem) => gem.category === selectedCategory);

  // Shuffle gems for "Surprise Me"
  const handleSurpriseMe = () => {
    const shuffled = [...hiddenGems].sort(() => Math.random() - 0.5);
    setDisplayedGems(shuffled);
  };

  return (
    <section className="py-8 bg-gradient-to-b from-sky-500 to-sky-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Hidden Gems Near You</h2>
        <p className="text-sky-200 mb-6">Uncover cozy cafes, underground art spots, or secret rooftop lounges you've never heard of!</p>

        {/* Filter Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-sky-500 text-white border border-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-sky-500">
                {category}
              </option>
            ))}
          </select>

          {/* Surprise Me Button */}
          <button
            onClick={handleSurpriseMe}
            className="flex items-center justify-center px-6 py-2 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-400 transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Surprise Me
          </button>
        </div>

        {/* Gems Carousel (Mobile) / Grid (Desktop) */}
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-800 md:grid md:grid-cols-3 md:gap-4 md:overflow-x-visible">
          {filteredGems.length > 0 ? (
            filteredGems.map((gem) => (
              <div
                key={gem.id}
                className="min-w-[280px] max-w-[280px] md:min-w-0 md:max-w-none bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{gem.name}</h3>
                    <span className="text-sm text-sky-200">{gem.aiBadge}</span>
                  </div>
                  <p className="text-sm text-sky-200">{gem.category}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {gem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-sky-500 text-white px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-3">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                    <span className="ml-1 text-white">{gem.rating}</span>
                  </div>
                  <button className="mt-4 w-full bg-sky-400 text-white py-2 rounded-full hover:bg-sky-300 transition duration-300">
                    Discover
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sky-200">No hidden gems found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HiddenGems;