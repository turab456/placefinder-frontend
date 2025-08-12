import React, { useState } from 'react';

// Sample data for local top picks (replace with API data)
const localPicks = [
  {
    id: 1,
    userName: 'Aisha, Koramangala',
    userAvatar: 'https://via.placeholder.com/40?text=Aisha',
    placeName: 'Urban Brew',
    review: 'Perfect spot for coffee and chill vibes!',
    rating: 4.7,
    tags: ['#ChillVibes', '#ForBookLovers'],
  },
  {
    id: 2,
    userName: 'Rahul, Indiranagar',
    userAvatar: 'https://via.placeholder.com/40?text=Rahul',
    placeName: 'Sky Lounge',
    review: 'Great rooftop with amazing views.',
    rating: 4.8,
    tags: ['#NightView', '#PartyVibes'],
  },
  {
    id: 3,
    userName: 'Priya, Whitefield',
    userAvatar: 'https://via.placeholder.com/40?text=Priya',
    placeName: 'Hidden Nook',
    review: 'Cozy cafe, ideal for quiet evenings.',
    rating: 4.6,
    tags: ['#ChillVibes', '#Cozy'],
  },
  {
    id: 4,
    userName: 'Vikram, MG Road',
    userAvatar: 'https://via.placeholder.com/40?text=Vikram',
    placeName: 'Artisan Bistro',
    review: 'Delicious food, super friendly staff!',
    rating: 4.9,
    tags: ['#Foodie', '#ChillVibes'],
  },
  {
    id: 5,
    userName: 'Sneha, Jayanagar',
    userAvatar: 'https://via.placeholder.com/40?text=Sneha',
    placeName: 'Book Haven',
    review: 'A paradise for book lovers.',
    rating: 4.7,
    tags: ['#ForBookLovers', '#Cozy'],
  },
];

const LocalTopPicks = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'ChillVibes', 'Foodie', 'ForBookLovers', 'PartyVibes'];

  // Filter picks based on selected category
  const filteredPicks = selectedCategory === 'All'
    ? localPicks
    : localPicks.filter((pick) => pick.category.name.includes(`#${selectedCategory}`));

  return (
    <section className="py-8 bg-gradient-to-b from-peach-50 to-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Top Picks by Locals</h2>
        <p className="text-gray-600 mb-6">Loved by your city’s explorers – trusted picks from real locals.</p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                selectedCategory === category
                 ? 'bg-sky-500 text-white'
                  : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
              }`}
            >
              {category.category.name}
            </button>
          ))}
        </div>

        {/* Carousel (Mobile) / Grid (Desktop) */}
        <div className="p-2 flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-peach-100 md:grid md:grid-cols-3 md:gap-4 md:overflow-x-visible">
          {filteredPicks.length > 0 ? (
            filteredPicks.map((pick) => (
              <div
                key={pick.id}
                className="min-w-[260px] max-w-[260px] md:min-w-0 md:max-w-none bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 relative"
              >
                {/* Comment Bubble */}
                <div className="absolute -top-2 -right-2 text-sky-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Verified Local
                </div>
                <div className="flex items-center mb-3">
                  <img
                    src={pick.userAvatar}
                    alt={pick.userName}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-indigo-900">{pick.userName}</h3>
                    <p className="text-sm text-gray-600">{pick.placeName}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">{pick.review}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {pick.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-peach-200 text-peach-900 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                  <span className="ml-1 text-gray-700">{pick.rating}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No local picks found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocalTopPicks;