const DEFAULT_COUNTRY = 'NL'; //country default when only the year filter is set
const MIN_YEAR = 1100; 
const MAX_YEAR = new Date().getFullYear();

// Current filter choices obj
const state = {
  gadmGid: null,
  provinceName: null,
  yearFrom: MIN_YEAR,
  yearTo: MAX_YEAR,
};

let fullExtent = null;

// DOM references
const resetBtnEl = document.getElementById('resetAdmin');
const occBtnEl   = document.getElementById('openOcc');
const yearControlEl = document.getElementById('yearControl');

// Map
const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
      className: 'ol_bw'
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([5.3, 52.2]),
    zoom: 7.5
  })
});

// Provinces Layer
// Map the PDOK province name to GADM code
const pdokToGadm = {
  "Groningen": "NLD.5_1",
  "Fryslân": "NLD.3_1",
  "Drenthe": "NLD.1_1",
  "Overijssel": "NLD.10_1",
  "Flevoland": "NLD.2_1", // Potentialy need to also add area with code "NLD.13_1"NLD.6_1"
  "Gelderland": "NLD.4_1",
  "Utrecht": "NLD.11_1",
  "Noord-Holland": "NLD.9_1",
  "Zuid-Holland": "NLD.14_1",
  "Zeeland": "NLD.12_1", // Potentialy need to also add area with code "NLD.13_1"
  "Noord-Brabant": "NLD.8_1",
  "Limburg": "NLD.7_1"
};

// Provinces layer used for selecting provinces by map click and retrieving the province name and GADM ID, which are then used to build the GBIF Maps API calls
const provincesLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0?request=GetFeature&service=WFS&version=1.1.0&typeName=bestuurlijkegebieden:Provinciegebied&outputFormat=application/json&srsName=EPSG:3857', // Provinces from PDOK WFS as JSON
    format: new ol.format.GeoJSON(),
    attributions: ['| Provinces Kadaster via <a href="https://www.pdok.nl" target="_blank" rel="noopener">PDOK</a>', '| Occurrences via <a href="https://www.gbif.org" target="_blank" rel="noopener">GBIF</a>', '| Map rendered with <a href="https://openlayers.org" target="_blank" rel="noopener">OpenLayers</a>']
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({ color: 'rgba(100, 150, 200, 0)' }), // fill must be present for click detection
    stroke: new ol.style.Stroke({ color: '#335577', width: 2 })
  }),
  zIndex: 10
});
map.addLayer(provincesLayer);

// Attach the GADM codes to the PDOK province layer 
provincesLayer.getSource().on('addfeature', e => {
  const feature = e.feature;
  const name = feature.get('naam'); // PDOK field for province name
  if (name && pdokToGadm[name]) {
    feature.set('gadmGid', pdokToGadm[name]);
  }
});

// Store full extent once the geojson is ready
provincesLayer.getSource().on('change', function () {
  if (provincesLayer.getSource().getState() === 'ready') {
    fullExtent = provincesLayer.getSource().getExtent().slice();
    if (fullExtent) {
      map.getView().fit(fullExtent, { padding: [30, 30, 30, 30] });
    }
  }
});

// GBIF occurrences layer
const gbifLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({ url: 'about:blank', crossOrigin: 'anonymous', transition: 0, attributions: 'Occurrences via <a href="https://www.gbif.org" target="_blank" rel="noopener">GBIF</a>'}),
  visible: false,
  zIndex: 5
});
map.addLayer(gbifLayer);

// --- Helpers ---
function yearRangeChanged() {
  return state.yearFrom !== MIN_YEAR || state.yearTo !== MAX_YEAR;
}

function isFilterActive() { 
  return !!state.gadmGid || yearRangeChanged();
}

// Build GBIF URL
function buildGbifUrlFromState() {
  const baseUrl = 'https://api.gbif.org/v2/map/occurrence/adhoc/{z}/{x}/{y}@1x.png';
  const params = new URLSearchParams({
    srs: 'EPSG:3857',
    style: 'scaled.circles',
    ts: Date.now().toString() //timestamp is used to eliminate caching when tiles are changing 
  });
  if (state.gadmGid) { // identifies each province that is clicked on the map and makes the GBIF Maps API call
    params.set('gadm_gid', state.gadmGid); 
  } else if (yearRangeChanged()) {
    params.set('country', DEFAULT_COUNTRY);
  }

  if (yearRangeChanged()) {
    params.set('year', `${state.yearFrom},${state.yearTo}`);
  }

  return `${baseUrl}?${params.toString()}`;
}

// Apply current state to map and buttons
function render(zoomToExtent = false, extent = fullExtent) {
  if (zoomToExtent && extent) {
    map.getView().fit(extent, {
      padding: [30, 30, 30, 30],
      duration: 300
    });
  }

  // GBIF tiles
  if (isFilterActive()) {
    const url = buildGbifUrlFromState();
    gbifLayer.setSource(new ol.source.XYZ({// replace the source to force a clean refresh of tiles and avoid ghosting 
      url,
      crossOrigin: 'anonymous',
      transition: 0
    }));
    gbifLayer.setVisible(true);
  } else {
    gbifLayer.setVisible(false);
  }

  // Occurrences button
  if (state.gadmGid) {
    occBtnEl.textContent = `Occurrences in ${state.provinceName || 'area'}`;
    occBtnEl.style.display = 'inline-block';
  } else if (yearRangeChanged()) {
    occBtnEl.textContent = `Occurrences in ${DEFAULT_COUNTRY}`;
    occBtnEl.style.display = 'inline-block';
  } else {
    occBtnEl.style.display = 'none';
  }

  map.renderSync();
}

//  --- Interactions ---

// Click: select province and zoom
map.on('singleclick', (evt) => {
  const feature = map.getFeaturesAtPixel(evt.pixel, {
    layerFilter: l => l === provincesLayer
  })?.[0];

  if (feature) {
    state.gadmGid = feature.get('gadmGid');
    state.provinceName = feature.get('naam');
    const ext = feature.getGeometry().getExtent();
    render(true, ext);
  } else {     // click outside any province: clear province selection
    state.gadmGid = null;
    state.provinceName = null;
    render(true, fullExtent);
  }
});

// Pointer cursor over provinces
map.on('pointermove', (evt) => {
  if (evt.dragging) return;
  const hit = map.hasFeatureAtPixel(evt.pixel, { layerFilter: l => l === provincesLayer });
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

// Clear province selection button
resetBtnEl.addEventListener('click', () => {
  state.gadmGid = null;
  state.provinceName = null;
  render(true, fullExtent);
});
map.addControl(new ol.control.Control({ element: resetBtnEl }));

// Open GBIF occurrences page button
occBtnEl.addEventListener('click', () => {
  const params = new URLSearchParams();

  if (state.gadmGid) {
    params.set('gadm_gid', state.gadmGid);
  } else if (yearRangeChanged()) {
    params.set('country', DEFAULT_COUNTRY);
  }

  if (yearRangeChanged()) {
    params.set('year', `${state.yearFrom},${state.yearTo}`);
  }

  const qs = params.toString();
  if (qs) window.location.href = `/occurrence/search?${qs}`;
});
map.addControl(new ol.control.Control({ element: occBtnEl }));

// Year slider 
function initYearControl() {
  const el = document.getElementById('yearControl');
  const slider = el.querySelector('.yearSliderContainer');
  const label = el.querySelector('.yearLabel'); // Live label that changes according to current year range

  map.addControl(new ol.control.Control({ element: el }));

  // Build the slider
  noUiSlider.create(slider, {
    start: [MIN_YEAR, MAX_YEAR],
    step: 1,
    connect: true,
    range: { min: MIN_YEAR, max: MAX_YEAR },
    tooltips: { to: v => Math.round(v) }
  });

  // Update label when dragging 
  slider.noUiSlider.on('update', vals => {
    label.textContent = `${Math.floor(vals[0])} to ${Math.floor(vals[1])}`;
  });

  // When time range is finalised, update the state and render tiles
  slider.noUiSlider.on('change', vals => {
    state.yearFrom = Math.floor(vals[0]);
    state.yearTo = Math.floor(vals[1]);
    render(false); // No zoom, only refresh tiles
  });

  el.style.display = 'block'; // Make it visible, now that it's initialized

}

initYearControl();