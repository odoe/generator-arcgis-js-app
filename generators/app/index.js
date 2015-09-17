'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ArcgisJsApp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'Name of application',
      default: process.cwd().split(path.sep).pop()
    }, {
      type: 'input',
      name: 'description',
      message: 'Description of application',
      default: 'My ArcGIS JS App'
    }, {
      type: 'list',
      name: 'esriapi',
      message: 'API Version',
      choices: ['3.14', '3.13', '3.12'],
      default: '3.14'
    }, {
      type: 'input',
      name: 'email',
      message: 'Email of author',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));

  },
  writing: {
    app: function () {
      var data = {
        appname: this.props.appname,
        description: this.props.description,
        esriapi: this.props.esriapi,
        email: this.props.email,
        _: _
      };
      // templates
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('_gruntconfig.json'),
        this.destinationPath('gruntconfig.json'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('src/app/_package.json'),
        this.destinationPath('src/app/package.json'),
        data
      );
      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath('src/index.html'),
        data
      );

      // copy
      this.copy('profiles/build.profile.js');
      this.copy('scripts/livereload.js');
      // == app
      this.copy('src/dojoConfig.js');
      this.copy('src/app/app.profile.js');
      this.copy('src/app/config.js');
      this.copy('src/app/main.js')
      this.copy('src/app/router.js')
      // == gitkeep files
      this.copy('src/app/components/.gitkeep')
      this.copy('src/app/helpers/.gitkeep');
      this.copy('src/app/models/.gitkeep');
      this.copy('src/app/styles/.gitkeep');
      this.copy('src/app/templates/.gitkeep');
      this.copy('tests/functional/.gitkeep');
      this.copy('tests/lib/.gitkeep');
      this.copy('tests/support/.gitkeep');
      this.copy('tests/unit/.gitkeep');
      // == app files
      this.copy('src/app/components/legend/css/Legend.styl');
      this.copy('src/app/components/legend/templates/Legend.html');
      this.copy('src/app/components/legend/View.js');

      this.copy('src/app/components/map/css/Map.styl');
      this.copy('src/app/components/map/MapView.js');
      this.copy('src/app/components/map/WebMapView.js');

      this.copy('src/app/helpers/mapgenerator.js');
      this.copy('src/app/helpers/supportsLocalStorage.js');
      this.copy('src/app/helpers/zoom.js');

      this.copy('src/app/styles/main.styl');

      this.copy('src/app/templates/Application.html');
      this.copy('src/app/templates/Application.js');

      // == tests
      this.copy('tests/lib/selenium-server-standalone-2.46.0.jar');
      this.copy('tests/unit/components-legend-view.js');
      this.copy('tests/unit/components-map-mapview.js');
      this.copy('tests/unit/components-map-webmapview.js');
      this.copy('tests/unit/helpers-mapgenerator.js');
      this.copy('tests/unit/helpers-zoom.js');
      this.copy('tests/intern.js');

      // == robots and crossdomain
      this.copy('src/robots.txt');
      this.copy('src/crossdomain.xml');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_jsconfig.json'),
        this.destinationPath('jsconfig.json')
      );
      this.copy('Gruntfile.js');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
