/*
token: pk.eyJ1IjoicGVuZ3VpbmMyaDYiLCJhIjoiY2tleHNjZXNlMG5jcTJ1bWZ4NmgxYXU5cCJ9.f3hDqiQWGc6PU1VD89XmCg
style: mapbox://styles/penguinc2h6/ckfus8d6g5z0q19k2db7mkxui/draft
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW52aW51biIsImEiOiJja2VrNHRla3kwZDkyMnl0Nng4Nno1cGJmIn0.pAJqAvlrWzR-YyBY9YCYIg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/devinvinun/ckeu5g2kn9rrt19o5e99zzy70',
  center: [144.96, -37.81],
  zoom: 12
});

map.on('load', function() {
  var statusNames = ['Cinema', 'Retail', 'Art Gallery/Museum', 'Aquarium'];
  var statusIconCodes = ['\uf03d', '\uf07a', '\uf19c', '\uf1b0'];
  var statusIcons = ['cinema', 'grocery', 'town-hall', 'veterinary']
  for (i = 0; i < statusNames.length; i++) {
    var statusName = statusNames[i];
    var statusIconCode = statusIconCodes[i];
    var statusIcon = statusIcons[i];

    map.addLayer({
      id: statusName,
      type: 'symbol',
      source: {
        type: 'vector',
        url: 'mapbox://penguinc2h6.7m71ym0m'
      },
      'source-layer': 'POI-08he71',
      'layout': {
        'icon-allow-overlap': true,
        'icon-image': ['concat', statusIcon, '-15']
      },
      'filter': ['==', 'Sub_Theme', statusName]
    });

    // button
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = statusName;
    link.setAttribute('symbol', statusIconCode);
    link.setAttribute('active_colour', '#1f78b4');
    if (link.className === 'active') {
      link.style.backgroundColor = "#3887be";
    }

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
        this.style.backgroundColor = "#3887be";
      }
    };
  }

  // restaurant and hotels
  var itemNames = ['Cafes and Restaurants', 'Pubs, Taverns and Bars', 'Bakery Product Manufacturing (Non-factory based)', 'Accommodation'];
  var itemNames_out = ['Cafe/Restaurant', 'Bar', 'Bakery', 'Hotel'];
  var itemIconCodes = ['\uf0f5', '\uf000', '\uf1fd', '\uf236'];
  var itemIcons = ['restaurant', 'bar', 'bakery', 'lodging']
  for (i = 0; i < itemNames.length; i++) {
    var itemName = itemNames[i];
    var itemIconCode = itemIconCodes[i];
    var itemIcon = itemIcons[i];
    var itemOut = itemNames_out[i]

    map.addLayer({
      id: itemOut,
      type: 'symbol',
      source: {
        type: 'vector',
        url: 'mapbox://penguinc2h6.d31bqmxn'
      },
      'source-layer': 'InfoVisual-17q3aw',
      'layout': {
        'icon-allow-overlap': true,
        'icon-image': ['concat', itemIcon, '-15']
      },
      'filter': ['==', 'Industry__', itemName]
    });

    // button
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = itemOut;
    link.setAttribute('symbol', itemIconCode);
    if (link.className === 'active') {
      link.style.backgroundColor = "#33a02c";
    }

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
        this.style.backgroundColor = "#33a02c";
      }
    };
  }

  // tram lines
  for (i = 1; i < 85; i++) {
    var itemName = "tramRoute" + i.toString();

    map.addLayer({
      id: itemName,
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://penguinc2h6.3hwm8bk2'
      },
      'source-layer': 'TramRoute-3sb9xp',
      'paint': {
        'line-color': '#F7455D',
        'line-width': 3
      },
      'filter': ['==', 'OBJECTID', i]
    });

    // button
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = itemName;
    link.setAttribute('symbol', '\uf238');
    if (link.className === 'active') {
      link.style.backgroundColor = "#e31a1c";
    }

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
        this.style.backgroundColor = "#e31a1c";
      }
    };
  }
});

map.addControl(new mapboxgl.NavigationControl());

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
