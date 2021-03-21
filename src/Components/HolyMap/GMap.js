import React, { useEffect, useRef } from "react";

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    googleMap = initGoogleMap();
    createMarker();
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 22.341900, lng: 91.815536 },
      zoom: 8,
    });
  };

  // create marker on google map
  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 22.341900, lng: 91.815536 },
      map: googleMap,
    });

  return <div ref={googleMapRef} style={{ width: '90%', height:400 , margin: '0 auto' }} />;
};

export default GMap;
