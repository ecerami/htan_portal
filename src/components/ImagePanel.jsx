import React from 'react';
import { observer } from 'mobx-react';
import L from 'leaflet';

@observer
class ImagePanel extends React.Component {

   /**
   * Load the Leaflet Map upon component mounting
   */
  componentDidMount() {
    var layer = this.props.appState.getLayer();
    this.map = L.map('map').setView([0, 0], 0);
    layer.addTo(this.map);

    var southWest = L.latLng(-100, -200);
    var northEast = L.latLng(100, 500);
    var bounds = L.latLngBounds(southWest, northEast);
    this.map.setMaxBounds(bounds);
  }

  drawMakers() {
    //   L.marker([0, 0]).addTo(map)
    //     .bindPopup('[0,0]')
    //     .openPopup();
    //   L.marker([0, 500]).addTo(map)
    //     .bindPopup('0,500')
    //     .openPopup();
    //   L.marker([0, -200]).addTo(map)
    //   .bindPopup('0,-200')
    //   .openPopup();
    //   L.marker([-100, 0]).addTo(map)
    //   .bindPopup('-100,0')
    //   .openPopup();
    //   L.marker([100, 0]).addTo(map)
    //   .bindPopup('100,0')
    //   .openPopup();    
    //   L.marker([83, 180]).addTo(map)
    //   .bindPopup('83,180')
    //   .openPopup();

    //   var polygon = L.polygon([
    //     [100, -200],
    //     [100, 500],
    //     [-100, 500],
    //     [-100, -200],
    // ]).addTo(map);    
  }

  render() {
      return (<div id="map"></div>)
  }

};

export default ImagePanel;
