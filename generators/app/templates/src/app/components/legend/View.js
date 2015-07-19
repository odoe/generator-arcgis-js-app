import declare from 'dojo/_base/declare';
import topic from 'dojo/topic';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import Legend from 'esri/dijit/Legend';

import templateString from 'dojo/text!./templates/Legend.html';

export default declare([
  _WidgetBase, _TemplatedMixin
], {

  baseClass: 'lgnd-node',

  templateString,

  postCreate() {
    topic.subscribe('map-ready', this.onMapReady.bind(this));
    topic.subscribe('map-change', this.onMapChange.bind(this));
  },

  onMapReady(data) {
    var node = this.lgndContainer;
    var map = data.map;
    var legend = new Legend({map}, node);
    legend.startup();
    this.set('legend', legend);
  },

  onMapChange(data) {
    var legend = this.get('legend');
    legend.set('map', data.map);
    legend.refresh();
  }

});
