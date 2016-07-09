'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('arcgis-js-app:app', function () {
  var name = 'My ArcGIS JS App';
  var normalizedNameRegEx = /"name": "my-arcgis-js-app"/;
  var description = 'My ArcGIS JS App';
  var email = 'twayson@esri.com';
  var version = '3.x';
  var css = 'stylus';
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        appname: name,
        description: description,
        email: email,
        esrijsversion: version,
        csspre: css
      })
      .on('error', function (error) {
        console.log('Oh Noes!', error);
      })
      .on('ready', function (generator) {
        // This is called right before `generator.run()` is called
        console.log('Ok ready!');
      })
      .on('end', function() {
        console.log('End');
        done();
      });
  });

  // README
  it('sets name in README', function() {
    assert.fileContent('README.md', new RegExp('## ' + name ));
  });
  it('sets description in README', function() {
    assert.fileContent('README.md', new RegExp(description));
  });

  // package.json
  it('sets normalized name in package.json', function() {
    assert.fileContent('package.json', normalizedNameRegEx);
  });
  it('sets description in package.json', function() {
    assert.fileContent('package.json', new RegExp('"description": "' + description + '"'));
  });
  it('sets author in package.json', function() {
    assert.fileContent('package.json', new RegExp('"author": "' + email + '"'));
  });

  // bower.json
  it('sets normalized name in bower.json', function() {
    assert.fileContent('bower.json', normalizedNameRegEx);
  });

  // app package.json
  it('sets normalized name in src/app/package.json', function() {
    assert.fileContent('src/app/package.json', normalizedNameRegEx);
  });

  // index.html
  it('sets name page title', function() {
    assert.fileContent('src/index.html', new RegExp('<title>' + name + '</title>'));
  });

  // remaining (copied) files
  it('creates app files', function () {
    assert.file([
      'profiles/build.profile.js',
      'src/dojoConfig.js',
      'src/app/app.profile.js',
      'src/app/config.js',
      'src/app/main.js',
      'src/app/components/legend/templates/Legend.html',
      'src/app/components/legend/Legend.js',
      'src/app/components/map/MapView.js',
      'src/app/components/map/WebMapView.js',
      'src/app/helpers/mapgenerator.js',
      'src/app/helpers/supportsLocalStorage.js',
      'src/app/helpers/zoom.js',
      'src/app/templates/Application.html',
      'src/app/templates/Application.js'
    ]);
  });
  it('creates stylus files', function () {
    assert.file([
      'src/app/styles/main.styl',
      'src/app/components/legend/css/Legend.styl',
      'src/app/components/map/css/Map.styl'
    ]);
  });
  it('creates test files', function () {
    assert.file([
      'tests/unit/components-legend-view.js',
      'tests/unit/components-map-mapview.js',
      'tests/unit/components-map-webmapview.js',
      'tests/unit/helpers-mapgenerator.js',
      'tests/unit/helpers-zoom.js',
      'tests/intern.js'
    ]);
  });
  it('creates site files', function() {
    'src/robots.txt',
    'src/crossdomain.xml'
  });
  it('creates project files', function () {
    assert.file([
      '.bowerrc',
      '.eslintrc',
      '.travis.yml',
      '.gitignore',
      'jsconfig.json',
      'Gruntfile.js'
    ]);
  });
});
