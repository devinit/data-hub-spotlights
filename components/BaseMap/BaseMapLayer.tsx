import { FunctionComponent } from 'react';
import mapboxgl, { Map, Layer } from 'mapbox-gl';

interface BaseMapLayerProps extends Layer {
  map?: Map;
  show?: boolean;
}

const BaseMapLayer: FunctionComponent<BaseMapLayerProps> = ({ map, show, ...options }) => {
  if (map) {
    if (map.getLayer(options.id)) {
      map.removeLayer(options.id);
    }
    if (show) {
      map.addLayer(options);
      const popup = new mapboxgl.Popup({
        offset: 5,
        closeOnClick: false,
        closeButton: false
      });
      map.on('mousemove', 'highlight', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features?.[0].properties) {
          const geometry = e.features?.[0].geometry;
          if (geometry.type === 'Polygon') {
            const coordinates = geometry.coordinates[0][0];
            popup
              .setLngLat([coordinates[0], coordinates[1]])
              .setHTML('<h3>' + e.features?.[0].properties.DName2019 + '</h3>')
              .addTo(map);
          }
        } else {
          return 'null';
        }
      });
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'highlight', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  }

  return null;
};

BaseMapLayer.defaultProps = { show: true };

export { BaseMapLayer };
