import React, { useState } from 'react';

// Sample reel data (replace with API data)
const reels = [
  {
    id: 1,
    name: 'Urban Brew',
    location: 'Koramangala',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    hashtags: ['#HiddenGem', '#CoffeeVibes'],
    likes: 245,
  },
  {
    id: 2,
    name: 'Sky Lounge',
    location: 'Indiranagar',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    hashtags: ['#NightView', '#PartyVibes'],
    likes: 320,
  },
  {
    id: 3,
    name: 'Hidden Nook',
    location: 'Whitefield',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    hashtags: ['#RainyDayCafes', '#Cozy'],
    likes: 180,
  },
  {
    id: 4,
    name: 'Artisan Bistro',
    location: 'MG Road',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    hashtags: ['#Foodie', '#CollegeVibes'],
    likes: 410,
  },
];

const TrendingReels = () => {
  const [likedReels, setLikedReels] = useState({});

  const handleLike = (id) => {
    setLikedReels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (reel) => {
    // Replace with real share logic (e.g., Web Share API or copy link)
    alert(`Sharing reel: ${reel.name} from ${reel.location}`);
  };

  return (
    <section className="py-8 bg-gradient-to-b from-peach-50 to-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Trending Reels</h2>
        <p className="text-gray-600 mb-6">Discover local cafes, events, and hangouts through short, vibrant videos!</p>

        {/* Carousel */}
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-peach-100">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="min-w-[180px] max-w-[180px] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Video Container (9:16 aspect ratio) */}
              <div className="relative w-full" style={{ paddingBottom: '177.78%' /* 9/16 * 100 */ }}>
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  onTouchStart={(e) => e.target.play()}
                  onTouchEnd={(e) => e.target.pause()}
                >
                  <source src={reel.videoUrl} type="video/mp4" />
                </video>
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-50 hover:opacity-0 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Content */}
              <div className="p-3">
                <h3 className="text-base font-semibold text-indigo-900">{reel.name}</h3>
                <p className="text-sm text-gray-600">{reel.location}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {reel.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-peach-200 text-peach-900 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleLike(reel.id)}
                    className="flex items-center text-sm text-gray-700 hover:text-red-500 transition duration-200"
                  >
                    <svg
                      className={`w-5 h-5 mr-1 ${likedReels[reel.id] ? 'text-red-500 fill-red-500' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {reel.likes + (likedReels[reel.id] ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => handleShare(reel)}
                    className="flex items-center text-sm text-gray-700 hover:text-sky-500 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingReels;