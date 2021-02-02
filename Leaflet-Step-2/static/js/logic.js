let step2_graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

let step2_satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

let step2_outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });

let map_object = L.map("mapid", {
    center: [
        40.7, -94.5
    ],
    zoom: 3,
    layers: [step2_graymap, step2_satellitemap, step2_outdoormap]
});

step2_graymap.addTo(map_object);

let tectonic_Data = new L.LayerGroup();
let earthquake_Data = new L.LayerGroup();

let baseMaps = {
    Grayscale: step2_graymap,
    Sattelite: step2_satellitemap,
    Outdoors: step2_outdoormap
};

let overlays = {
    "Tectonic Plates": tectonic_Data,
    Earthquakes: earthquake_Data
};

L
    .control
    .layers(baseMaps, overlays)
    .addTo(map_object);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {
    
    function styleData(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getMarkerColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getMarkerRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    function getMarkerColor(depth) {
        switch (true) {
          case depth > 90:
            return "#ba1212";
          case depth > 70:
            return "#d16915";
          case depth > 50:
            return "#e68a00";
          case depth > 30:
            return "#ccad00";
          case depth > 10:
            return "#ffff33";
          default:
            return "#00b33c";
        }
    }

    function getMarkerRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
          }
      
          return magnitude * 4;
    }

    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          },
          style: styleData,
          onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "Magnitude: "
                + feature.properties.mag
                + "<br>Depth: "
                + feature.geometry.coordinates[2]
                + "<br>Location: "
                + feature.properties.place
            );
        }
    }).addTo(earthquake_Data);

    earthquake_Data.addTo(map.object);

    let map_legend = L.control({
        position: "bottomright"
    });

    map_legend.onAdd = function() {
        legend_div = L.DomUtil.create("div", "info legend");

        let grade_scale = [-10, 10, 30, 50, 70, 90];
        let color_scale = [
            "#00b33c",
            "#ffff33",
            "#ccad00",
            "#e68a00",
            "#d16915",
            "#ba1212"
        ];

        for (var i = 0; i < grade_scale.length; i++) {
        div.innerHTML += "<i style='background: " + color_scale[i] + "'></i> "
        + grade_scale[i] + (grade_scale[i + 1] ? "&ndash;" + grade_scale[i + 1] + "<br>" : "+");
        }
        return legend_div;
  };

  map_legend.addTo(map_object);

  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
    function(platedata) {
      // Adding our geoJSON data, along with style information, to the tectonicplates
      // layer.
      L.geoJson(platedata, {
        color: "purple",
        weight: 2
      })
      .addTo(tectonic_Data);

      // Then add the tectonicplates layer to the map.
      tectonic_Data.addTo(map_object);
    });

});