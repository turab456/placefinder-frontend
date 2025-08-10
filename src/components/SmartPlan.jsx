import React, { useState, useEffect } from 'react';

// Mock function to fetch suggestions based on mood, weather, and past visits
const fetchSuggestions = async (mood, weather, location) => {
  // Replace with real API call integrating mood, weather, and user history
  return [
    {
      id: 1,
      timeSlot: 'Morning',
      name: 'Urban Brew',
      description: 'Start your day with a cozy coffee at this local favorite.',
      category: 'Cafe',
      estimatedTime: '1 hr',
      distance: '0.5 miles',
      mood: 'Calm',
      weather: 'Sunny',
    },
    {
      id: 2,
      timeSlot: 'Afternoon',
      name: 'City Trails',
      description: 'Explore scenic trails for a refreshing outdoor adventure.',
      category: 'Hiking',
      estimatedTime: '2 hrs',
      distance: '1.2 miles',
      mood: 'Active',
      weather: 'Sunny',
    },
    {
      id: 3,
      timeSlot: 'Evening',
      name: 'Moonlit Bistro',
      description: 'Enjoy a romantic dinner with ambient lighting.',
      category: 'Restaurant',
      estimatedTime: '1.5 hrs',
      distance: '0.8 miles',
      mood: 'Date night',
      weather: 'Any',
    },
  ];
};

const SmartPlan = () => {
  const [plan, setPlan] = useState([]);
  const [userMood, setUserMood] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: NYC
  const [weather, setWeather] = useState('Sunny'); // Mock weather
  const [isPlanning, setIsPlanning] = useState(false);

  // Fetch user location
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

  // Handle plan generation
  const handleStartPlanning = async () => {
    setIsPlanning(true);
    const suggestions = await fetchSuggestions(userMood, weather, userLocation);
    setPlan(suggestions);
  };

  // Handle route optimization (mock)
  const handleOptimizeRoute = () => {
    // Replace with real route optimization logic (e.g., Google Maps API)
    const shuffledPlan = [...plan].sort(() => Math.random() - 0.5); // Mock shuffle
    setPlan(shuffledPlan);
  };

  // Handle export/share (mock)
  const handleExportShare = () => {
    // Replace with real export/share logic (e.g., generate PDF or share link)
    alert('Itinerary exported/shared!'); // Mock alert
  };

  return (
    <section className="py-8 bg-gradient-to-b from-sky-50 to-peach-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Plan Your Day</h2>
        <p className="text-gray-600 mb-6">Create a personalized itinerary with nearby experiences tailored to your mood and the weather.</p>

        {/* Start Planning Input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="What’s your mood? (e.g., Calm, Active, Date night)"
            value={userMood}
            onChange={(e) => setUserMood(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700"
          />
          <button
            onClick={handleStartPlanning}
            className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition duration-300"
          >
            Start Planning
          </button>
        </div>

        {/* Timeline */}
        {isPlanning && (
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-sky-300 md:left-8"></div>

            {plan.length > 0 ? (
              plan.map((item) => (
                <div
                  key={item.id}
                  className="relative mb-8 pl-12 md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 md:left-6 top-4 w-4 h-4 bg-sky-500 rounded-full"></div>
                  <div className="bg-gradient-to-r from-white to-sky-100 rounded-xl shadow-lg p-5">
                    <h3 className="text-lg font-semibold text-indigo-900">{item.timeSlot}: {item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
                    <div className="flex gap-4 mt-2">
                      <p className="text-sm text-gray-500">Time: {item.estimatedTime}</p>
                      <p className="text-sm text-gray-500">Distance: {item.distance}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                      <span className="ml-1 text-gray-700">{item.rating || '4.7'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 pl-12 md:pl-16">No plan yet. Enter a mood and start planning!</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {plan.length > 0 && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleOptimizeRoute}
              className="flex items-center justify-center px-6 py-2 rounded-full bg-peach-500 text-white font-medium hover:bg-peach-600 transition duration-300"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Optimize Route
            </button>
            {/* <button
              onClick={handleExportShare}
              className="flex items-center justify-center px-6 py-2 rounded-full text-sky-500 text-white font-medium hover:bg-sky-600 transition duration-300"
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Export/Share
            </button> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartPlan;