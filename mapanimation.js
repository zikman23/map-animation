mapboxgl.accessToken = 'pk.eyJ1IjoiemlrbWFuIiwiYSI6ImNsYmpyeDVoZjB5cnozcGxjcmJkdWV5cHUifQ.TmKB9jKIfzvkdehpmGdoAQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-77.047591, 38.92324],
  zoom: 14,
});

var marker = new mapboxgl.Marker().setLngLat([-77.047591, 38.92324]).addTo(map);

const busStops = [
  [-77.047591, 38.92324],
  [-77.043425, 38.923209],
  [-77.04282, 38.92298],
  [-77.042559, 38.92231],
  [-77.04165, 38.91799],
  [-77.04164, 38.91682],
  [-77.0387, 38.917009],
  [-77.03686, 38.917],
  [-77.034769, 38.917009],
  [-77.03224, 38.917009],
  [-77.02915, 38.917],
  [-77.02735, 38.916969],
  [-77.025948, 38.916992],
];

let counter = 0;
function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}
