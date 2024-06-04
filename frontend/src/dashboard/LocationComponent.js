import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import axios from 'axios';
import AuthContext from '../AuthContext';

// Correcting the default marker's icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationComponent = () => {
    const { isLoggedIn } = React.useContext(AuthContext);

    const [status, setStatus] = useState(false);
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });
    const [error, setError] = useState("");

    const collegeLocation = { lat: 21.9974, lng: 79.0011 }; // College location coordinates
    const maxDistance = 25; // Maximum distance allowed for attendance marking (in meters)

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: [location.coords.latitude, location.coords.longitude],
        });
    };

    const onError = error => {
        setError(error.message);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
        } else {
            const options = {
                enableHighAccuracy: true, // Request high accuracy
                timeout: 5000, // Maximum time to wait for a location (in milliseconds)
                maximumAge: 0 // Force the device to get a new location
            };
            const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        }
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in meters
        return distance;
    };

    const tryAttend = () => {
        const distance = calculateDistance(location.coordinates[0], location.coordinates[1], collegeLocation.lat, collegeLocation.lng);
        if (distance <= maxDistance) {
            axios.post('http://localhost:5000/attendences/attend', {
                attendee: isLoggedIn._id
            })
                .then((response) => {
                    console.log(response.data);
                    alert('Attendance marked successfully');
                    setStatus(1);
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to mark attendance');
                    setStatus(-1);
                });
        } else {
            alert('You are too far from the college to mark attendance.');
        }
    }
    useEffect(() => {
        if (location.loaded) {
            tryAttend();
            console.log("Latitude:", location.coordinates[0]);
            console.log("Longitude:", location.coordinates[1]);
        }
    }, [location]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <h4>Your Current Location</h4>
                <small><i>Your Attendance will be marked only if you are within 25 meters of the college.</i></small>
                <br /><br /><br />
                {error ? (
                    <div>Error: {error}</div>
                ) : !location.loaded ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        Latitude: {location.coordinates[0]}, Longitude: {location.coordinates[1]}
                    </div>
                )}
                <br /><br /><br />
                <div>
                    <Box display={'inline-block'} p={2} border={'2px solid black'} borderRadius={5}
                         borderColor={
                             status === 1 ? 'success.main' : status === -1 ? 'error.main' : 'info.main'
                         }
                         color={
                             status === 1 ? 'success.main' : status === -1 ? 'error.main' : 'info.main'
                         }
                    >
                        {status === 1 ? 'Attendance Marked' : status === -1 ? 'Attendance Failed' : 'Status Pending'}
                    </Box>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{ position: 'relative', border: '2px solid black', height: '400px' }}>
                    {location.loaded && (
                        <MapContainer center={location.coordinates} zoom={17} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={location.coordinates}>
                                <Popup>Your Current Location</Popup>
                            </Marker>
                            <CircleMarker center={[collegeLocation.lat, collegeLocation.lng]} pathOptions={{ color: 'red' }} radius={20}>
                                <Popup>College Location</Popup>
                            </CircleMarker>
                        </MapContainer>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default LocationComponent;
