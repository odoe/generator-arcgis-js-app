import declare from 'dojo/_base/declare';
import Evented from 'dojo/Evented';
import topic from 'dojo/topic';
import router from 'dojo/router';
import urlUtils from 'esri/urlUtils';

var Router = declare([Evented], {

  start() {
    var urlObj = urlUtils.urlToObject(location.href);

    this.emit('query-params', urlObj.query);

    router.register('/webmap/:mapid', e => {
      topic.publish('web-map-update', e.params);
    });

    router.startup();
  }

});

export default Router;
