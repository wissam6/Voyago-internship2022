import * as React from "react";
import { Map, MapLayers, MapShapeLayer, MapTileLayer, MapMarkerLayer, TileUrlTemplateArgs } from '@progress/kendo-react-map';
const center = [30.2686, -97.7494];
const tileSubdomains = ['a', 'b', 'c'];

const tileUrl = (e: TileUrlTemplateArgs) => `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;

const attribution = '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';
const geoShapes = [{
  type: 'Polygon',
  coordinates: [
    [[-97.7409, 30.2675], [-97.7409, 30.2705], [-97.7490, 30.2707], [-97.7494, 30.2686], [-97.7409, 30.2675]]]
}];
const shapeStyle = {
  fill: {
    color: '#fff',
    opacity: 0.5
  },
  stroke: {
    width: 3,
    color: '#bbb'
  }
};
const markers = [{
  latlng: [30.2675, -97.7409],
  name: 'Zevo Toys'
}, {
  latlng: [30.2707, -97.7490],
  name: 'Foo Bars'
}, {
  latlng: [30.2705, -97.7409],
  name: 'Mainway Toys'
}, {
  latlng: [30.2686, -97.7494],
  name: 'Acme Toys'
}];

export const MapContainer = () => <div>
  <Map center={center} zoom={15}>
    <MapLayers>
      <MapTileLayer urlTemplate={tileUrl} subdomains={tileSubdomains} attribution={attribution} />
      <MapShapeLayer data={geoShapes} style={shapeStyle} />
      <MapMarkerLayer data={markers} locationField="latlng" titleField="name" />
    </MapLayers>
  </Map>
</div>;

