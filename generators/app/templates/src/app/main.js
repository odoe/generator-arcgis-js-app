/*eslint no-unused-vars:0*/
import Application from 'app/templates/Application';
import Router from 'app/router';
import config from 'app/config';

let node = document.getElementById('app-container');
let router = new Router();

let app;
let webmapid;

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

if (webmapid) {
  app = new Application({ webmapid }, node);
} else if (config.mapOptions){
  app = new Application({ mapOptions: config.mapOptions }, node);
}

router.start();

export default app;
