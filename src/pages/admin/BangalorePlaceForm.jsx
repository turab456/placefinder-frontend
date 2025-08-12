import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function BangalorePlaceForm() {
  const [placeTypes, setPlaceTypes] = useState([]);
  const [categories, setCategories] = useState([]); // Renamed for clarity
  const [moods, setMoods] = useState([]);
  const [success, setSuccess] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    city: "Bangalore",
    state: "Karnataka",
    moodTags: "",
    rating: "",
    imageUrl: "",
    description: "",
    lat: "",
    long: "",
    placeType: "",
  });

  // Fetch all data in parallel for optimization
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placeTypesRes, categoriesRes, moodsRes] = await Promise.all([
          axios.get("https://placefinder-backend-1.onrender.com/api/moods/get-moods"),
          axios.get("https://placefinder-backend-1.onrender.com/api/moods/get-category"),
          axios.get("https://placefinder-backend-1.onrender.com/api/moods"),
        ]);
        setPlaceTypes(placeTypesRes.data);
        setCategories(categoriesRes.data);
        setMoods(moodsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, address: value }));
    setShowSuggestions(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.length > 2) {
      setLoadingSuggestions(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const res = await axios.get(`https://placefinder-backend-1.onrender.com/api/location/forward-geocode`, {
            params: {
              address: `${value}`,

            },

          });
          setLocationSuggestions(res.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setLocationSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 400);
    } else {
      setLocationSuggestions([]);
      setLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (place) => {
    setFormData((prev) => ({
      ...prev,
      address: place.display_name,
      lat: place.lat,
      long: place.lon,
    }));
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };
  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          lat: latitude.toFixed(6), // limit decimals for readability
          long: longitude.toFixed(6),
        }));
        setSuccess("Current location fetched successfully!");
        // Optionally, you could reverse geocode the coordinates to fill the address too,
        // but you currently don't have that logic here.
        try {
          const data = await axios.get("https://placefinder-backend-1.onrender.com/api/location/reverse-geocode", {
            params: {
              lat: latitude,
              lon: longitude
            }
          })
          setFormData((prev) => ({
            ...prev,
            address: data.data.display_name
          }))
        } catch (error) {
          console.log(error)
        }
      },
      (error) => {
        alert("Unable to fetch location. Please allow location access.");
        console.error(error);
      }
    );


  };
  // Add new place on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://placefinder-backend-1.onrender.com/api/places", formData);
      setSuccess(data.message || "Place added successfully!");
      // Reset form after success
      setFormData({
        name: "",
        category: "",
        address: "",
        city: "Bangalore",
        state: "Karnataka",
        moodTags: "",
        rating: "",
        imageUrl: "",
        description: "",
        lat: "",
        long: "",
        placeType: "",
      });
    } catch (error) {
      console.error("Error adding place:", error);
      setSuccess(""); // Clear success on error
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Bangalore Place</h1>
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter place name"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-4 relative">

          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
            Address
          </label>

          <input
            name="address"
            type="text"
            placeholder="Your location..."
            value={formData.address}
            onChange={handleLocationChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={fetchCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded"
            title="Fetch Current Location"
          >
            Use Current Location
          </button>
          {showSuggestions && (
            <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {loadingSuggestions && (
                <li className="px-4 py-2 text-center text-gray-500 text-sm">Loading locations...</li>
              )}
              {!loadingSuggestions &&
                locationSuggestions.length > 0 &&
                locationSuggestions.map((place, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(place)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {place.display_name}
                  </li>
                ))}
              {!loadingSuggestions && locationSuggestions.length === 0 && (
                <li className="px-4 py-2 text-center text-gray-400 text-sm">No suggestions found</li>
              )}
            </ul>
          )}

        </div>

        {/* City & State */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        {/* Mood Tags */}
        <div className="mb-4">
          <label htmlFor="moodTags" className="block text-gray-700 font-semibold mb-2">
            Mood Tags
          </label>
          <select
            id="moodTags"
            name="moodTags"
            value={formData.moodTags}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>
              Select Mood
            </option>
            {moods?.map((mo) => (
              <option key={mo._id} value={mo._id}>
                {mo.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">
            Rating (0-5)
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 font-semibold mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 resize-y focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        {/* Latitude and Longitude */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="lat" className="block text-gray-700 font-semibold mb-2">
              Latitude
            </label>
            <input
              type="number"
              name="lat"
              id="lat"
              value={formData.lat}
              onChange={handleChange}
              step="0.0001"
              placeholder="Latitude"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="long" className="block text-gray-700 font-semibold mb-2">
              Longitude
            </label>
            <input
              type="number"
              name="long"
              id="long"
              value={formData.long}
              onChange={handleChange}
              step="0.0001"
              placeholder="Longitude"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        {/* Place Type */}
        <div className="mb-6">
          <label htmlFor="placeType" className="block text-gray-700 font-semibold mb-2">
            Place Type *
          </label>
          <select
            id="placeType"
            name="placeType"
            value={formData.placeType}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>
              Select Place Type
            </option>
            {placeTypes?.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Place
        </button>
      </form>
    </div>
  );
}