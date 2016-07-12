const zoom = (map, geometry) => {
  if (geometry.type === 'point') {
    const mz = map.getMaxZoom();
    if (mz) {
      return map.centerAndZoom(geometry, mz - 2);
    } else {
      return map.centerAt(geometry);
    }
  } else {
    return map.setExtent(geometry.getExtent(), true);
  }
};

export default zoom;
