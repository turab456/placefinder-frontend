  import axios from 'axios';
  import React, { useContext, useEffect, useState } from 'react';
  import { PlacesContext } from '../context/PlaceContext';

  // Sample data for places with mood tags (replace with API data in production)


  const MoodSuggestions = () => {
    const { places } = useContext(PlacesContext);
    const [selectedMood, setSelectedMood] = useState('Luxury');
    const [moods, setMood] = useState([])
    // const moods = ['All', 'Calm', 'Productive', 'Party', 'Chill', 'Insta-worthy'];
    const fetchMoods = async () => {
      try {
        const response = await axios.get('https://placefinder-backend-1.onrender.com/api/moods');
        const data = response.data;
        setMood(data);
      } catch (error) {
        console.error('Error fetching moods:', error);
      }
    }
    console.log(moods, "moods in mood suggestions");
    // Emoji mapping for mood tags
    const moodEmojis = {
      All: '🌟',
      Calm: '😌',
      Productive: '🧠',
      Party: '🎉',
      Chill: '🧘',
      'Insta-worthy': '📸',
    };

    // Filter places based on selected mood
    const filteredPlaces = selectedMood === 'Luxury'
      ? places
      : places.filter((place) => place?.moodTags === selectedMood);
    useEffect(() => {

      fetchMoods();
    }, []);
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Top Picks by Mood</h2>

          {/* Mood Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {moods?.map((mood) => (
              <button
                // key={mood.id}
                onClick={() => setSelectedMood(mood.name)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${selectedMood === mood.name
                  ? 'bg-sky-500 text-white'
                  : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
                  }`}
              >
                {/* <span className="mr-2">{moodEmojis[mood]}</span> */}
                {mood.name}
              </button>
            ))}
          </div>

          {/* Filtered Places */}
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="min-w-[280px] max-w-[280px] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-indigo-900">{place.name}</h3>
                    <p className="text-sm text-gray-500">{place.category}</p>
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                      <span className="ml-1 text-gray-700">{place.rating}</span>
                    </div>
                    <button className="mt-4 w-full bg-sky-500 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                      Explore
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No places found for this mood.</p>
            )}
          </div>
        </div>
      </section>
    );
  };

  export default MoodSuggestions;