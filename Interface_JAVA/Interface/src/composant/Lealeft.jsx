import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Importez le CSS de Leaflet Routing Machine
import 'leaflet-routing-machine';
import { Report } from 'notiflix/build/notiflix-report-aio';

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState([-21.4550, 47.0853]); // Coordonnées de l'hôpital Andrianjato de Fianarantsoa
  const [anotherPlace, setAnotherPlace] = useState([-21.4457, 47.0791]); // Coordonnées de l'autre endroit
  const hospitalTambohobe = [-21.4457, 47.0791];
  const [map, setMap] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    }, (err) => {
      console.error(err);
    }, {
      enableHighAccuracy: true
    });
  }, []);
  useEffect(() => {
    if (map && position) {
      const leafletRouting = Routing.control({
        waypoints: [
          L.latLng(position[0], position[1]),
          L.latLng(destination[0], destination[1]),
          L.latLng(hospitalTambohobe[0], hospitalTambohobe[1]),
        ],
        routeWhileDragging: true,
        show: false, // Ne pas afficher le chemin par défaut
        lineOptions: {
          styles: [{ color: 'red', opacity: 0, weight: 5 }], // Style du chemin
        },
      }).addTo(map.leafletElement);

      return () => {
        map.leafletElement.removeControl(leafletRouting); // Supprimer le contrôle de routage lorsque le composant est démonté
      };
    }
  }, [map, position, destination, hospitalTambohobe]);
  const calculateDistance = (pointA, pointB) => {
    if (!pointA || !pointB || pointA.length < 2 || pointB.length < 2) {
      return null; // Gérer les cas où les coordonnées sont manquantes ou invalides
    }
  
    const rad = (x) => (x * Math.PI) / 180; // Convertir degrés en radians
    const R = 6378137; // Rayon de la Terre en mètres
    const dLat = rad(pointB[0] - pointA[0]);
    const dLong = rad(pointB[1] - pointA[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(pointA[0])) *
        Math.cos(rad(pointB[0])) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const compareDistances = () => {
    if (position) {
      const distanceToDestination = calculateDistance(position, destination);
      const distanceToAnotherPlace = calculateDistance(position, anotherPlace);

      let message = '';
      if (distanceToDestination && distanceToAnotherPlace) {
        if (distanceToDestination < distanceToAnotherPlace) {
          message = `La distance la plus proche de vous est ${distanceToDestination} mètres jusqu'à l'Hôpital Andrianjato de Fianarantsoa`;
        } else {
          message = `La distance la plus proche de vous est ${distanceToAnotherPlace} mètres jusqu'à l'Hôpital Tambohobe de Fianarantsoa`;
        }
      }

      console.log(message)
    }
  };
  useEffect(() => {
    if(map){  
    compareDistances(); // Appeler la fonction lors de la création de la carte
}
  }, [map]);
  const greenIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return (
    <MapContainer
      center={position || [-21.4500, 47.0833]}
      zoom={15}
      style={{ height: "70vh", width: "100%" }}
      whenCreated={(mapInstance) => setMap(mapInstance)}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Vue Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}"
            attribution='&copy; <a href="https://www.esri.com">ESRI</a> contributors'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {position && (
        <Marker position={position} >
          <Popup>
            Vous êtes ici : {position[0].toFixed(5)}, {position[1].toFixed(5)}
          </Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={destination}>
          <Popup>
            Hôpital Andrianjato de Fianarantsoa : {destination[0].toFixed(5)}, {destination[1].toFixed(5)}
            <br />Distance à la destination : {calculateDistance(position, destination)} mètres
          </Popup>
        </Marker>
      )}
      {anotherPlace && (
        <Marker position={anotherPlace}>
          <Popup>
           Hopital Tambohobe: {anotherPlace[0].toFixed(5)}, {anotherPlace[1].toFixed(5)}
            <br />Distance à cet endroit : {calculateDistance(position, anotherPlace)} mètres
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapComponent;
