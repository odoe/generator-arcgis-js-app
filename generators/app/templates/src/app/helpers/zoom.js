import * as curry from 'dojox/lang/functional/curry';

var zoom = curry((map, geometry) => {
  if (geometry.type === 'point') {
    var mz = map.getMaxZoom();
    if (mz) {
      map.centerAndZoom(geometry, mz - 2);
    } else {
      map.centerAt(geometry);
    }
  } else {
    map.setExtent(geometry.getExtent(), true);
  }
});

export default zoom;
