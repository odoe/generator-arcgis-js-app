window.dojoConfig = {
  baseUrl: '.',
  parseOnLoad: true,
  isDebug: true,
  async: true,
  deps: ['app/main'],
  packages: [
    'app',
    'dijit',
    'dojo',
    'dojox',
    'dstore',
    'dgrid',
    'esri', {
      name: 'moment',
      location: 'moment',
      main: 'moment'
    }
  ]
};
