/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXZyb3JpbGthIiwiYSI6ImNranprMndhcTA4NzYydmxpamc5aWNiOXUifQ.cFxlPHlrCF_MgW6xCh5ulg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/avrorilka/ckjzkkm4d0mw017qwio6t4zmp',
    scrollZoom: false,
    zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>День ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 250,
      bottom: 100,
      left: 50,
      right: 50,
    },
  });
};
