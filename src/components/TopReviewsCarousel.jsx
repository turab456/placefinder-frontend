import React, { useState } from 'react';

// Sample review data (replace with API data)
const reviews = [
  {
    id: 1,
    userName: 'Emma S.',
    userAvatar: 'https://via.placeholder.com/40?text=Emma',
    placeName: 'SkyHigh Rooftop',
    category: 'Foodies',
    rating: 4.8,
    review: 'Amazing cocktails and stunning views! Perfect for a night out.',
  },
  {
    id: 2,
    userName: 'Liam T.',
    userAvatar: 'https://via.placeholder.com/40?text=Liam',
    placeName: 'Cozy Nook Cafe',
    category: 'Coffee Lovers',
    rating: 4.6,
    review: 'Best latte in town, super cozy vibe for working or chilling.',
  },
  {
    id: 3,
    userName: 'Sophia R.',
    userAvatar: 'https://via.placeholder.com/40?text=Sophia',
    placeName: 'Zen Garden',
    category: 'Solo Travelers',
    rating: 4.7,
    review: 'A peaceful escape, ideal for solo reflection or reading.',
  },
  {
    id: 4,
    userName: 'Noah K.',
    userAvatar: 'https://via.placeholder.com/40?text=Noah',
    placeName: 'Vibe Club',
    category: 'Foodies',
    rating: 4.9,
    review: 'Incredible food and lively atmosphere, a must-visit!',
  },
  {
    id: 5,
    userName: 'Olivia M.',
    userAvatar: 'https://via.placeholder.com/40?text=Olivia',
    placeName: 'Artisan Cafe',
    category: 'Coffee Lovers',
    rating: 4.5,
    review: 'Great coffee and pastries, perfect for a morning stop.',
  },
  {
    id: 6,
    userName: 'James P.',
    userAvatar: 'https://via.placeholder.com/40?text=James',
    placeName: 'Scenic Lookout',
    category: 'Solo Travelers',
    rating: 4.8,
    review: 'Breathtaking views, a great spot for solo adventures.',
  },
];

const TopReviewsCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Foodies', 'Coffee Lovers', 'Solo Travelers'];

  // Filter reviews based on selected category
  const filteredReviews = selectedCategory === 'All'
    ? reviews
    : reviews.filter((review) => review.category === selectedCategory);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Top Reviewed by Locals</h2>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                selectedCategory === category
                  ? 'bg-sky-500 text-white'
                  : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel (Mobile) / Grid (Desktop) */}
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 md:grid md:grid-cols-3 md:gap-4 md:overflow-x-visible">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[280px] max-w-[280px] md:min-w-0 md:max-w-none bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-indigo-900">{review.userName}</h3>
                    <p className="text-sm text-gray-600">{review.placeName}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">{review.review}</p>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                  <span className="ml-1 text-gray-700">{review.rating}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopReviewsCarousel;