import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlacesContext } from '../context/PlaceContext';

const Navbar = () => {
    const {setUserLocation}= useContext(PlacesContext);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const debounceTimer = useRef(null);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, long: longitude });
                    try {
                        const response = await axios.get(
                            `https://placefinder-backend-1.onrender.com/api/location/reverse-geocode?lat=${latitude}&lon=${longitude}`
                        );
                        const data = response.data;
                        setLocation(data?.display_name || '');
                        // const placesRes = await axios.get(`http://localhost:5000/api/nearby-places?lat=${latitude}&lon=${longitude}`);
                        // setPlaces(placesRes.data);
                    } catch (error) {
                        console.error('Error fetching address:', error);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            alert("Geolocation not supported");
        }
    }, []);

    // Handle live location input search with debouncing
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        setShowSuggestions(true);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (value.length > 2) {
            setLoadingSuggestions(true);
            debounceTimer.current = setTimeout(async () => {
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                        params: {
                            q: `${value}, Bangalore`, // restrict to Bangalore
                            format: 'json',
                            addressdetails: 1,
                            limit: 5,
                            countrycodes: 'in', // restrict to India
                        },
                        headers: {
                            'User-Agent': 'YourAppName/1.0 (youremail@example.com)', // Customize this
                        },
                    });
                    setLocationSuggestions(res.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setLocationSuggestions([]);
                } finally {
                    setLoadingSuggestions(false);
                }
            }, 400); // 400ms debounce
        } else {
            setLocationSuggestions([]);
            setLoadingSuggestions(false);
        }
    };

    const handleSuggestionClick = (place) => {
        setLocation(place.display_name);
        setLocationSuggestions([]);
        setShowSuggestions(false);
        setUserLocation({
            lat: place.lat,
            long: place.lon
        });
    };

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-2xl font-bold text-sky-500">AIPlace</div>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 relative">


                    <div className="relative w-full sm:w-64">
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Your location..."
                            value={location}
                            onChange={handleLocationChange}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        />
                        {showSuggestions && (
                            <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                                {loadingSuggestions && (
                                    <li className="px-4 py-2 text-center text-gray-500 text-sm">
                                        Loading locations...
                                    </li>
                                )}
                                {!loadingSuggestions && locationSuggestions.length > 0 && locationSuggestions.map((place, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(place)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {place.display_name}
                                    </li>
                                ))}
                                {!loadingSuggestions && locationSuggestions.length === 0 && (
                                    <li className="px-4 py-2 text-center text-gray-400 text-sm">
                                        No suggestions found
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    <button
                        // onClick={}
                        className="bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                        Search
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
