// PlacesContext.js
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const PlacesContext = createContext();

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // meters
    const toRad = deg => (deg * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const PlacesProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    console.log(userLocation, "userLocation");



    useEffect(() => {
        axios
            .get("http://localhost:3000/api/places")
            .then((res) => {
                setPlaces(res.data);
            })
            .catch((err) => {
                console.error("Error fetching places:", err);
            });
    }, []);

    useEffect(() => {
        if (userLocation && places.length > 0) {
            const filtered = places
                .map(place => {
                    const distance = getDistance(
                        userLocation.lat,
                        userLocation.long,
                        place.lat,
                        place.long
                    );
                    return { ...place, distance };
                })
                .filter(p => p.distance <= 5000) // 2 km
                .sort((a, b) => a.distance - b.distance);

            setNearbyPlaces(filtered);
        }
    }, [userLocation, places]);


    console.log(userLocation, "userLocation in context");
    return (
        <PlacesContext.Provider value={{ places, nearbyPlaces, userLocation, setUserLocation }}>
            {children}
        </PlacesContext.Provider>
    );
};
