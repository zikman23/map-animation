mapboxgl.accessToken = 'pk.eyJ1IjoiemlrbWFuIiwiYSI6ImNsYmpyeDVoZjB5cnozcGxjcmJkdWV5cHUifQ.TmKB9jKIfzvkdehpmGdoAQ'; // Replace with your Mapbox access token

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-77.047591, 38.92324],
  zoom: 14,
});

const wmataApiKey = 'f946f66f1cc649db821514c191673ea1'; // Your WMATA API Key
const routeId = '96'; // The bus route ID you want to display

// Function to fetch bus stop data from WMATA API
async function fetchBusStops() {
  const url = `https://api.wmata.com/Bus.svc/json/jRouteDetails?RouteID=${routeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        api_key: wmataApiKey,
      },
    });

    const data = await response.json();

    // Get stops from Direction0 only
    const stops = data.Direction0.Stops;
    return stops;
  } catch (error) {
    console.error('Failed to fetch bus stops:', error);
  }
}

// Define boundaries (example coordinates, replace with your desired boundaries)
const lowerLeft = { lat: 38.913, lon: -77.045 };
const upperRight = { lat: 38.93, lon: -77.0175 };

// Check if a stop is within the defined boundaries
function isInBounds(stop) {
  return stop.Lat >= lowerLeft.lat && stop.Lat <= upperRight.lat && stop.Lon >= lowerLeft.lon && stop.Lon <= upperRight.lon;
}

// Updated function to update the map with new bus stops within the boundaries
async function updateBusStops() {
  const busStops = await fetchBusStops();

  if (busStops) {
    busStops.filter(isInBounds).forEach((stop) => {
      new mapboxgl.Marker()
        .setLngLat([stop.Lon, stop.Lat])
        .setPopup(new mapboxgl.Popup().setText(`${stop.Name} (Lat: ${stop.Lat}, Lon: ${stop.Lon})`)) // Include lat/lon in the popup
        .addTo(map);
    });
  }
}

// Modify the existing 'move' function to call updateBusStops
function move() {
  updateBusStops();
}
