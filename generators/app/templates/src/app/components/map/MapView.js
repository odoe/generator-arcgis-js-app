import declare from 'dojo/_base/declare';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import topic from 'dojo/topic';

import Map from 'esri/map';

export default declare([
  _WidgetBase, _TemplatedMixin
], {

  templateString: '<div class="map-node"></div>',

  postCreate() {
    var node = this.domNode;
    var mapOptions = this.get('mapOptions');
    var map = new Map(node, mapOptions);
    map.on('load', () => topic.publish('map-ready', { map }));
    this.set('map', map);
  }

});
