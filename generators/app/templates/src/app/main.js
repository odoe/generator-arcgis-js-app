import Application from 'app/templates/Application';
import Router from 'app/router';
import config from 'app/config';

var node = document.getElementById('app-container');
var router = new Router();

var app;
var webmapid;

if (config.webmap && config.webmap.webmapid) {
  webmapid = config.webmap.webmapid;
}

router.on('query-params', params => {
  if (params && params.mapid) {
    webmapid = params.mapid;
  }
  if (!app) {
    app = new Application({ webmapid }, node);
  }
});

if (config.mapOptions) {
  var mapOptions = config.mapOptions;
  app = new Application({ mapOptions }, node);
}

router.start();

export default app;
