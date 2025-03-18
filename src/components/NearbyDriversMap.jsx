import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Car } from 'lucide-react';

const NearbyDriversMap = ({ drivers, center, radius }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = (token) => {
    setMapboxToken(token);
    setShowTokenInput(false);
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center.lng, center.lat],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Wait for map to load
    map.current.on('load', () => {
      if (!map.current) return;

      // Add search radius circle
      map.current.addSource('radius-circle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [center.lng, center.lat],
          },
          properties: {},
        },
      });

      map.current.addLayer({
        id: 'radius-circle-fill',
        type: 'circle',
        source: 'radius-circle',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, 1000 * radius], // Convert km to meters and scale for zoom level
            ],
            base: 2,
          },
          'circle-color': '#3B82F6',
          'circle-opacity': 0.15,
        },
      });

      map.current.addLayer({
        id: 'radius-circle-border',
        type: 'circle',
        source: 'radius-circle',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, 1000 * radius], // Convert km to meters and scale for zoom level
            ],
            base: 2,
          },
          'circle-color': '#3B82F6',
          'circle-opacity': 0,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#3B82F6',
        },
      });

      // Add user marker
      new mapboxgl.Marker({
        color: '#3B82F6',
      })
        .setLngLat([center.lng, center.lat])
        .addTo(map.current);

      // Add driver markers
      drivers.forEach((driver) => {
        // Create a popup with driver info, including vehicle details if available
        const vehicleInfo = driver.vehicle ? `
          <div class="mt-1 pt-1 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm">
              ${driver.vehicle.make || ''} ${driver.vehicle.model || ''}
              ${driver.vehicle.year ? `(${driver.vehicle.year})` : ''}
              ${driver.vehicle.color ? `, ${driver.vehicle.color}` : ''}
            </p>
            ${driver.vehicle.seatsAvailable ? `<p class="text-sm">${driver.vehicle.seatsAvailable} seats available</p>` : ''}
          </div>
        ` : '';

        // Create a popup with driver info
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <h3 class="font-medium">${driver.name}</h3>
            <p>${driver.rating} ⭐ • ${driver.distance}</p>
            ${vehicleInfo}
          </div>`
        );

        // Add the driver marker
        new mapboxgl.Marker({
          color: '#10B981',
        })
          .setLngLat([driver.location.lng, driver.location.lat])
          .setPopup(popup)
          .addTo(map.current);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [center, drivers, radius, mapboxToken]);

  if (showTokenInput) {
    return (
      <div className="p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">Mapbox API Token Required</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          To use the map feature, you need to provide your Mapbox public token. You can get one at{' '}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-3">
          <Input 
            placeholder="Enter your Mapbox public token"
            onChange={(e) => setMapboxToken(e.target.value)}
            value={mapboxToken}
            className="flex-1"
          />
          <Button onClick={() => handleTokenSubmit(mapboxToken)}>Submit</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default NearbyDriversMap; 