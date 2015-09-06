/*eslint no-unused-vars:0*/
import declare from 'dojo/_base/declare';
import domConstruct from 'dojo/dom-construct';

import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';

import templateString from 'dojo/text!./templates/<%=name%>.html';

export default declare([
  _WidgetBase, _TemplatedMixin
], {

  templateString,
  baseClass: '<%=_.slugify(name)%>'

});
