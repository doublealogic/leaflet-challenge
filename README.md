# Leaflet Challenge: Visualizing Geological Survey Data

## Background
This repository centers around using Leaflet to help visualize data for the United States Geological Survey which is often shortened to USGS. The USGS provides scientific data about natural harzards, both our ecosystem's and environment's health; and the impacts of climate and land-use change. Their scientists work to develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. I was given a fictional task of helping out the USGS with a new project.

In this fictional project, the USGS is interested in building a new set of tools that allows them to visualize their earthquake data. They collect a massive amount of data from all over the world every day, but there is currently no meaningful way of displaying all this data. The hope is that if we can visualize the data, it will allow the USGS to better educate the public and other government organizations (which could lead to more funding) on issues that are facing the planet presently.

## Project Tasks

### Leaflet Step 1: Basic Visualization

First, the earthquake data set needs to be visualized. You can find everything in Step 1 located in the [`Leaflet-Step-1`](Leaflet-Step-1) folder.

1. **Gather the data set**

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I went ahead and visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and picked a data set to visualize. I was given a JSON representation of that data. Then I used the URL of this JSON to pull in the data for my visualization.

2. **Import and Visualize the Data**

I created a map using Leaflet that plotted all of the earthquakes from your data set based on their longitude and latitude.

* All of the data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

* I also included popups that provide additional information about the earthquake whenever a marker is clicked.

* Last, I created a legend that provides context for the map data.


### Leaflet Step 2: Bonus - More Data

Everything in this step 2 can be found in the [`Leaflet-Step-2`](Leaflet-Step-2) folder.

For this part of the project, the USGS wanted a second data set plotted onto my map that would illustrate the relationship between tectonic plates and seismic activity. So I pulled in a second data set from this site: and visualized alongside my original set of data used in Step 1. 

* In addition, I added a number of base maps to choose from, as well as separated out our two different data sets into overlays that can be turned on and off independently.

* Last, I added layer controls to the map.