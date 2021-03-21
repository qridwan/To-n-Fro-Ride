import React, { useState, useEffect } from 'react';
import GMap from './GMap';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyB5bzu77Y7Dd7ncN3q8v86-5W_TQmRo4EM';

// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}
const HolyMap = () => {
    const [loadMap, setLoadMap] = useState(false);
  
    useEffect(() => {
      loadGoogleMapScript(() => {
        setLoadMap(true)
      });
    }, []);
  
    return (
      <div>
        {!loadMap ? <div>Loading...</div> : <GMap />}
      </div>
    );
  }

export default HolyMap;