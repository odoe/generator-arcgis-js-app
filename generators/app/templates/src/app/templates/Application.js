/*eslint no-unused-consts:0*/
import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import MapView from 'app/components/map/MapView';
import Legend from 'app/components/legend/Legend';

import templateString from 'dojo/text!./Application.html';

export default declare([
  _WidgetBase, _TemplatedMixin
], {
  templateString,

  postCreate() {
    const mapnode = document.getElementById('map-view');
    const legendnode = document.getElementById('legend-view');
    const mapOptions = this.get('mapOptions');
    const map = new MapView({ mapOptions }, mapnode);
    const legend = new Legend({}, legendnode);

    this.set('map', map);
    this.set('legend', legend);
  },
  destroy() {
    this.legend.destroy();
    this.map.destroy();
  }
});
