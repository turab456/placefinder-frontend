import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PlacesContext } from '../context/PlaceContext';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});



const LocalBuzzMap = () => {
  const { places } = useContext(PlacesContext);
  const [userLocation, setLocation] = useState({ lat: 12.9716, long: 77.5946 }); // Default to Bangalore
  const [selectedCategory, setSelectedCategory] = useState('mall');

  const categories = places.map(place => { return place.category.name });
  const uniqueCategories = [...new Set(categories)].sort();

  const filteredPlaces = selectedCategory === 'mall'
    ? places
    : places.filter((place) => place.category.name === selectedCategory);

  return (
    <section className="py-8 bg-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Local Buzz</h2>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {uniqueCategories.map((category) => (
            <button
              // key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${selectedCategory === category
                ? 'bg-sky-500 text-white'
                : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
                }`}
            >
              {category.charAt(0).toUpperCase()+category.slice(1)}
            </button>
          ))}
        </div>

        {/* Map */}
        <MapContainer
          center={[userLocation.lat, userLocation.long]}
          zoom={13}
          style={{ height: '400px', width: '100%', borderRadius: '1rem', zIndex: 0 }}
          className="shadow-xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredPlaces?.map((place) => (
            <Marker position={[place.lat, place.long]}>
              <Popup>
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-indigo-900">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.category.name.charAt(0).toUpperCase()+place.category.name.slice(1)} • {place.moodTags.name.charAt(0).toUpperCase()+place.moodTags.name.slice(1)}</p>
                  <div className="flex items-center mt-1">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 7.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{place.rating}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default LocalBuzzMap;