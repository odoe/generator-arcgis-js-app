import watchUtils from 'esri/core/watchUtils';

import OnDemandGrid from 'dgrid/OnDemandGrid';
import Selection from 'dgrid/Selection';

import store from '../stores/app';

const Grid = OnDemandGrid.createSubclass(Selection, {
  selectionMode: 'single'
});

export function createList(elem) {
  const list = new Grid({
    columns: [
      {
        label: 'Facility',
        field: 'FACILITY_NAME'
      }
    ]
  }, elem);
  return list;
}

export function selectHandler(event) {
  const data = event.rows[0].data;
  store.zoomToItem('tri', data);
}

export function facilitySort(f) {
  return function(a, b) {
    if (a[f] < b[f]) {
      return -1;
    }
    if (a[f] > b[f]) {
      return 1;
    }
    return 0;
  }
}

export function updateMemory(list) {
  return function(memory) {
    list.set('collection', memory);
    list.set('sort', facilitySort('FACILITY_NAME'));
    return list;
  }
}

export function whenViewReady(elem) {
  return function() {
    store.addToUI({ elem, position: 'bottom-right' });
    return store.getAllItems('tri');
  }
}

function create() {
  const container = document.createElement('div');
  container.classList.add('item-container');
  const elemList = document.createElement('div');
  elemList.classList.add('esri-widget', 'item-list');
  container.appendChild(elemList);
  const list = createList(elemList);
  list.startup();
  list.on('dgrid-select', selectHandler);
  watchUtils.once(store, 'view')
    .then(({ target:t }) => t.view)
    .then(whenViewReady(container))
    .then(updateMemory(list));
}

export default Object.freeze({ create });