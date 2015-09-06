/*eslint no-unused-vars:0*/
import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import MapView from 'app/components/map/MapView';
import Legend from 'app/components/legend/View';

import templateString from 'dojo/text!./Application.html';

export default declare([
  _WidgetBase, _TemplatedMixin
], {
  templateString,

  postCreate() {
    var mapnode = document.getElementById('map-view');
    var legendnode = document.getElementById('legend-view');
    var mapOptions = this.get('mapOptions');
    var map = new MapView({ mapOptions }, mapnode);
    var legend = new Legend({}, legendnode);

    this.set('map', map);
    this.set('legend', legend);
  },
  destroy() {
    this.legend.destroy();
    this.map.destroy();
  }
});
