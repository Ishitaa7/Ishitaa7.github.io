---
layout: page
date: 2023-05-25 16:40:16
title: "Visualization of Large-Scale Weather Data for Regional Pattern Analysis"
# description: another project with an image 🎉
img: assets/img/17.webp
importance: 11
category: completed
tags: [Data Visualization, Weather Analytics, Geospatial Analysis, Python, Plotly, NetCDF, Interactive Visualization, Climate Data]
toc:
  sidebar: left
---
## Overview

> ##### NOTE
>
> This post pertains to a central government project. Consequently, the datasets and outputs referenced herein are not provided, as they are subject to governmental restrictions and cannot be publicly shared.
{: .block-warning }


The human brain craves visual clarity—a trait that makes graphical representations so powerful. Faced with an avalanche of data points across various weather metrics, data visualization transforms chaos into comprehensible patterns.

 With this thought in mind, I worked on identifying the most effective visualization methods for a dynamic global weather map as a Summer Research Intern at ***Bhaskaracharya National Institute for Space Applications and Geo-informatics***. By leveraging innovative techniques, I aimed to depict various weather parameters across different coordinates, turning raw data into actionable insights.
 
>The dataset comprised over 50,000 data points, each corresponding to worldwide coordinates and a suite of weather parameters: air temperature, wind speed, virtual temperature, pressure, wind direction, relative humidity, density, and surface pressure. 

Initially, the data format had to be converted from ***NetCDF*** to ***CSV*** to make it compatible for pandas framework. A lot of different data visualization techniques were tested, and heatmaps proved to be an effective method for analyzing spatial variations in weather parameters. 

>NetCDF does work with pandas using xarray. In this case, CSV was preferred because the analysis required a straightforward, tabular approach.

The project was completed several years ago, and at that time, the emphasis was on meeting project objectives rather than on archiving polished visual outputs. Unfortunately, I didn't capture a refined screenshot of the visualization, and due to the nature of the central government project, detailed outputs weren't preserved for public dissemination. As such, the current map represents the conceptual approach rather than the final, proprietary visual artifact.

## Interactive 3D Terrain Visualization of Weather Data

<iframe src="{{ '/assets/html/Enhanced_3D_Terrain_Weather_Map.html' | relative_url }}" width="100%" height="600px" style="border:none;"></iframe>

This interactive 3D weather visualization was developed using Plotly in Python to provide a geospatial terrain-based representation of weather parameters. Traditional 2D heatmaps often fail to highlight elevation-dependent weather variations, making a 3D interactive approach more effective for regional pattern analysis.

By hovering over different regions, users can dynamically inspect multiple weather parameters, including:

Air Temperature (°C), Wind Speed (m/s), Pressure (hPa), Humidity (%), Density (kg/m³), Elevation (m)

## How the 3D Map was Built

The interactive 3D terrain weather visualization was created using **Plotly in Python**. The terrain surface represents the elevation, while weather parameters such as **temperature, wind speed, pressure, and humidity** are displayed dynamically when hovering over different regions.

## Key Steps in the Code
1. **Data Preparation:** Weather data was structured as a grid with latitude & longitude.
2. **Elevation Mapping:** A synthetic elevation model was generated for realistic terrain effects.
3. **Plotly Surface Plot:** The terrain was visualized with a color gradient (`terrain_colorscale`).
4. **Scatter Overlay for Hover Info:** Weather data points were placed slightly above the surface so tooltips display all weather parameters when hovered.

### Converting NetCDF to CSV (Preprocessing)
```python
from netCDF4 import Dataset
import pandas as pd
import numpy as np

# Load NetCDF file
nc_file = Dataset("weather_data.nc", mode="r")

# Extract variables
lat = nc_file.variables["latitude"][:]
lon = nc_file.variables["longitude"][:]
temperature = nc_file.variables["temperature"][:]
wind_speed = nc_file.variables["wind_speed"][:]
pressure = nc_file.variables["pressure"][:]
humidity = nc_file.variables["humidity"][:]
density = nc_file.variables["density"][:]

# Create a structured DataFrame
df = pd.DataFrame({
    "Latitude": np.repeat(lat, len(lon)),
    "Longitude": np.tile(lon, len(lat)),
    "Air Temperature": temperature.flatten(),
    "Wind Speed": wind_speed.flatten(),
    "Pressure": pressure.flatten(),
    "Humidity": humidity.flatten(),
    "Density": density.flatten()
})

# Save as CSV
df.to_csv("weather_data.csv", index=False)
```

### Generating the 3D Terrain
To create a realistic terrain effect, a synthetic elevation model was generated, simulating natural land formations.

```python
elevation = np.sin(df["Longitude"] * 0.5) * np.cos(df["Latitude"] * 0.5) * 50 + np.random.normal(0, 5, df.shape[0])
```

Then, a 3D surface plot was created using Plotly, where the elevation was mapped onto a custom color gradient.

```python
import plotly.graph_objects as go

fig = go.Figure()

fig.add_trace(go.Surface(
    z=elevation.reshape((len(lat), len(lon))),
    x=df["Longitude"].values.reshape((len(lat), len(lon))),
    y=df["Latitude"].values.reshape((len(lat), len(lon))),
    surfacecolor=elevation.reshape((len(lat), len(lon))),  
    colorscale="earth",
    colorbar=dict(title="Elevation (m)"),
    opacity=1.0
))
```

### Overlaying Weather Data for Interactivity
```python
# Generate hover tooltips with all weather parameters
hover_text = [
    f"<b>Lat:</b> {lat:.2f}, <b>Lon:</b> {lon:.2f}<br>"
    f"<b>Elevation:</b> {ele:.1f}m<br>"
    f"<b>Temperature:</b> {temp:.1f}°C<br>"
    f"<b>Wind Speed:</b> {wind:.2f} m/s<br>"
    f"<b>Pressure:</b> {press:.1f} hPa<br>"
    f"<b>Humidity:</b> {hum:.1f}%<br>"
    f"<b>Density:</b> {dens:.3f} kg/m³"
    for lat, lon, ele, temp, wind, press, hum, dens in zip(
        df["Latitude"], df["Longitude"], elevation,
        df["Air Temperature"], df["Wind Speed"],
        df["Pressure"], df["Humidity"],
        df["Density"]
    )
]

# Add scatter markers for hover interaction
fig.add_trace(go.Scatter3d(
    x=df["Longitude"],
    y=df["Latitude"],
    z=elevation + 2, 
    mode="markers",
    marker=dict(size=3, color=df["Air Temperature"], colorscale="viridis", opacity=0.8),
    text=hover_text,
    hoverinfo="text"
))
```






## Optimizing Large-Scale Weather Data Visualization
Since the dataset contained over **50,000 data points**, efficiency was a key concern. To ensure smooth interactivity:
- **Downsampling** was applied where necessary to improve load times.
- **Scatter3D markers** were offset slightly above the surface for clearer hover effects.
- The **opacity and resolution** of the terrain mesh were adjusted for visual clarity.
