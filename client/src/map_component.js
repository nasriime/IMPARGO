/* global fetch, L */
import React, { useEffect, useRef, useState } from 'react'
import Moment from 'moment'

const getRouteSummary = (locations) => {
  const to = Moment(locations[0].time).format('hh:mm DD.MM')
  const from = Moment(locations[locations.length - 1].time).format('hh:mm DD.MM')
  return `${from} - ${to}`
}

const getRandomColor = ()=> {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const MapComponent = ({results}) => {
  const map = useRef()
  const [locations, setLocations] = useState()
  const [error, setError] = useState()
  const [markers, setMarkers] = useState([])
  // Request location data.
  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((json) => {
        setLocations(json)
      })
  }, [])
  // TODO(Task 2): Request location closest to specified datetime from the back-end.

  // Initialize map.
  useEffect(() => {
    map.current = new L.Map('mapid')
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution
    })
    map.current.setView(new L.LatLng(52.51, 13.40), 9)
    map.current.addLayer(osm)
  }, [])
  // Update location data on map.
  useEffect(() => {
    if (!map.current || !locations) {
      return // If map or locations not loaded yet.
    }
    // TODO(Task 1): Replace the single red polyline by the different segments on the map.
    // Store all lat and lon
    const AllLatLon = []
    locations.forEach((segement)=>{
      const latlons = segement.map(({ lat, lon }) => [lat, lon])
      AllLatLon.push(latlons)
      const polyline = L.polyline(latlons, { color: getRandomColor() }).bindPopup(getRouteSummary(segement)).addTo(map.current)
      return () => map.current.remove(polyline)
    })
    // Fit bounds to all segements
    const polyline = L.polyline(AllLatLon)
    map.current.fitBounds(polyline.getBounds())

  }, [locations, map.current])
  // TODO(Task 2): Display location that the back-end returned on the map as a marker.
  useEffect(() => {
    setError('')
    if(results.length == 0){
      console.log(results.length == 0)
      setError('error happened')
      if(markers.length>0){
        markers.forEach(mark=>{
          mark.remove();
        })
      }
      return;
    }
    const markersArr = [];
    results.forEach(result=>{
      const resultDate =  Moment(result.time).format('hh:mm DD.MM')
      const marker = L.marker([result.lat, result.lon]).bindPopup(resultDate).openPopup().addTo(map.current);
      markersArr.push(marker)
    })
    setMarkers(markersArr)
  },[results])

  return (
    <div>
      {locations && `${locations.length} locations loaded`}
      {!locations && 'Loading...'}
      <div id='mapid' />
    </div>)
}

export default MapComponent
