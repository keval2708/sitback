"use client";
import { GoogleMap, Marker,useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const SignupGoogleLocations = ({ location,draggable, onChangeLocation }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  })

  const [marker, setMarker] = useState({
    id: 1,
    lat: 33.4,
    lng: -112.0,
    name: "Movable Shop",
    address: "Default Address",
  });

  useEffect(() => {
    if (location) {
      setMarker((prev) => ({
        ...prev,
        lat: +location?.lat || 33.4,
        lng: +location?.log || -112.0,
        address: location?.address,
        city: location?.city || "",
        state: location?.state || "",
        country: location?.country || "",
      }));
    }
  }, [location.lat, location.log]);

  const markerDragEndHandler = async (event) => {
  const newLat = event.latLng.lat();
  const newLng = event.latLng.lng();

  // Perform reverse geocoding using Google Maps Geocoding API
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      console.log("data", data);
      const newAddress = data.results[0].formatted_address;

      // Extract city and state from address components
      let city = "";
      let state = "";
      let country = "";

      // Loop through address components to find city and state
      data.results[0].address_components.forEach(component => {
        // Find city (locality or postal_town)
        if (component.types.includes("locality") ||
            component.types.includes("postal_town")) {
          city = component.long_name;
        }
        // Find state (administrative_area_level_1)
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }

        if (component.types.includes("country")) {
            country = component.long_name;
          }
      });

     console.log("Extracted Details - City:", city, "State:", state, "Country:", country);


      setMarker({
        ...marker,
        lat: newLat,
        lng: newLng,
        address: newAddress,
        city: city,
        state: state,
        country: country,
      });

      onChangeLocation({
        ...marker,
        lat: newLat,
        lng: newLng,
        address: newAddress,
        city: city,
        state: state,
        country: country,
      });
    } else {
      console.error("Error in geocoding response:", data.status);
    }
  } catch (error) {
    console.error("Error in geocoding request:", error);
  }
};

  return (
    <>
    {isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: marker.lat, lng: marker.lng }}
        zoom={14}
      >
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.name}
          draggable={draggable}
          onDragEnd={markerDragEndHandler}
        />
      </GoogleMap>
    ) : <></>}
    </>
  );
};

export default SignupGoogleLocations;
