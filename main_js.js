/*
token: pk.eyJ1IjoicGVuZ3VpbmMyaDYiLCJhIjoiY2tleHNjZXNlMG5jcTJ1bWZ4NmgxYXU5cCJ9.f3hDqiQWGc6PU1VD89XmCg
style: mapbox://styles/penguinc2h6/ckfus8d6g5z0q19k2db7mkxui/draft
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW52aW51biIsImEiOiJja2VrNHRla3kwZDkyMnl0Nng4Nno1cGJmIn0.pAJqAvlrWzR-YyBY9YCYIg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/devinvinun/ckg8yyuy50hn519nju5tthh8i',
  center: [144.96, -37.81],
  zoom: 12
});

map.on('load', function() {
  var layerNames = ['poi', 'rest', 'tram'];
  var layerUrls = ['mapbox://penguinc2h6.7m71ym0m', 'mapbox://penguinc2h6.d31bqmxn', 'mapbox://penguinc2h6.3hwm8bk2'];
  var layerSources = ['POI-08he71', 'InfoVisual-17q3aw', 'TramRoute-3sb9xp'];
  var buttonColors = ['#3887be', '#33a02c', '#e31a1c'];
  var layerTypes = ['symbol', 'symbol', 'line'];
  var layerAttrs = ['Sub_Theme', 'Industry__', 'OBJECTID'];

  var poiNames = ['Cinema', 'Retail', 'Art Gallery/Museum', 'Aquarium'];
  var poiIconCodes = ['\uf03d', '\uf07a', '\uf19c', '\uf1b0'];
  var poiIcons = ['cinema', 'grocery', 'town-hall', 'veterinary'];
  var poiNames_out = ['Cinema', 'Shopping', 'Museum/Art Gallery', 'Aquarium'];
  var poiOverlap = [true, true, true, true]

  var restNames = ['Cafes and Restaurants', 'Pubs, Taverns and Bars', 'Accommodation'];
  var restNames_out = ['Cafe/Restaurant', 'Bar', 'Hotel'];
  var restIconCodes = ['\uf0f5', '\uf000', '\uf236'];
  var restIcons = ['restaurant', 'bar', 'lodging']
  var restOverlap = [false, false, false]

  var statusNames, statusIconCodes, statusIcons, statusOutput, cap, statusNames_out, statusOverlap;

  for (i = 0; i < layerNames.length; i++) {
    var layerName = layerNames[i];
    var layerUrl = layerUrls[i];
    var layerSource = layerSources[i];
    var buttonColor = buttonColors[i];
    var layerType = layerTypes[i];
    var layerAttr = layerAttrs[i];
    switch (layerName) {
      case 'poi':
        statusNames = poiNames;
        statusNames_out = poiNames_out;
        statusIconCodes = poiIconCodes;
        statusIcons = poiIcons;
        statusOutput = poiNames_out;
        statusOverlap = poiOverlap;
        cap = statusNames.length;
        break;
      case 'rest':
        statusNames = restNames;
        statusNames_out = restNames_out;
        statusIconCodes = restIconCodes;
        statusIcons = restIcons;
        statusOutput = restNames_out;
        statusOverlap = restOverlap;
        cap = statusNames.length;
        break;
      case 'tram':
        cap = 1;
    }

    for (j = 0; j < cap; j++) {
      var statusName, statusIconCode, statusIcon, statusName_out, statuslap;
      if (layerName === 'tram') {
        statusName = "Tram Routes";
        statusIconCode = '\uf238';
        statusName_out = statusName;

        map.addLayer({
          id: statusName_out,
          type: 'line',
          source: {
            type: 'vector',
            url: layerUrl
          },
          'source-layer': layerSource,
          'paint': {
            'line-color': '#F7455D',
            'line-width': 2
          },
          'filter': ['==', 'RTPATHDESC', 'LR006_1_065']
        });
      } else {
        statusName = statusNames[j];
        statusIconCode = statusIconCodes[j];
        statusIcon = statusIcons[j];
        statusName_out = statusNames_out[j];
        statuslap = statusOverlap[j]

        map.addLayer({
          id: statusName_out,
          type: 'symbol',
          source: {
            type: 'vector',
            url: layerUrl
          },
          'source-layer': layerSource,
          'layout': {
            'icon-allow-overlap': statuslap,
            'icon-image': ['concat', statusIcon, '-15']
          },
          'filter': ['==', layerAttr, statusName]
        });
      }

      // button
      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';
      link.textContent = statusName_out;
      link.setAttribute('symbol', statusIconCode);
      if (link.className === 'active') {
        link.style.backgroundColor = buttonColor;
      }
      link.defaultColor = buttonColor;

      var layers = document.getElementById('button');
      layers.appendChild(link);

      link.onclick = function(e) {
        let clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        if (visibility !== 'none') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          this.className = '';
          this.style.backgroundColor = "#fff";
        } else {
          this.className = 'active';
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          this.style.backgroundColor = this.defaultColor;
        }
      };
    }
  }
});

map.addControl(new mapboxgl.NavigationControl());

/*
map.on('click', 'InfoVisual-17q3aw', function(e) {

  new mapboxgl.Popup()
    // the script in step 3 below must go in here
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.status)
    .addTo(map)
});
*/
/*
<div class="map-overlay" id="title">
  <h2>Building Development Status</h2>
</div>

<div class="map-overlay" id="legend"></div>

var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = statusColor;
    var value = document.createElement('span');
    value.innerHTML = statusName;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
*/
