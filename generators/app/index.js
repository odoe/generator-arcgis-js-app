'use strict';
var path = require('path');
var yeomanBase = require('yeoman-generator').Base;
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');

module.exports = yeomanBase.extend({
  prompting: function (done) {
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
      name: 'esrijsversion',
      message: 'Which version of ArcGIS JS API?',
      choices: ['3.x', '4.x']
    }, {
      type: 'list',
      name: 'csspre',
      message: 'Which CSS preprocessor?',
      choices: ['stylus', 'sass']
    }, {
      type: 'input',
      name: 'email',
      message: 'Email of author',
      default: ''
    }];
    return this.prompt(prompts)
      .then(function(answers) {
        this.props = answers;
        this.stylus = answers.csspre === 'stylus';
        this.sass = answers.csspre === 'sass';
        this.v3 = answers.esrijsversion === '3.x';
        this.v4 = answers.esrijsversion === '4.x';
        this.normalizedAppname = _.dasherize(answers.appname.toLowerCase()),
        this.description = answers.description;
        this.email = answers.email;
        this.log('app name', answers.appname);
        this.log('description', answers.description);
        this.log('arcgis js api version', answers.esrijsversion);
        this.log('css preprocessor', answers.csspre);
        this.log('email', answers.email);
      }.bind(this));
  },
  writing: {
    app: function () {
      var data = {
        appname: this.props.appname,
        v3: this.v3,
        v4: this.v4,
        stylus: this.stylus,
        sass: this.sass,
        // NPM names can no longer contain capital letters
        normalizedAppname: _.dasherize(this.props.appname.toLowerCase()),
        description: this.props.description,
        email: this.props.email
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
      this.template('_bower.json', 'bower.json');

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

      // == app
      this.copy('src/dojoConfig.js');
      this.copy('src/app/app.profile.js');
      if (this.v3) {
        this.directory('src/app/3x', 'src/app');
        this.directory('tests/3x', 'tests');
        this.directory('profiles/3x', 'profiles');
        if (this.sass) {
          this.template('src/styles/3x/main.scss', 'src/app/styles/main.scss');
        } else if (this.stylus) {
          this.template('src/styles/3x/main.styl', 'src/app/styles/main.styl');
        }
      } else if (this.v4) {
        this.directory('src/app/4x', 'src/app');
        this.directory('tests/4x', 'tests');
        this.directory('profiles/4x', 'profiles');
        if (this.sass) {
          this.template('src/styles/4x/main.scss', 'src/app/styles/main.scss');
        } else if (this.stylus) {
          this.template('src/styles/4x/main.styl', 'src/app/styles/main.styl');
        }
      }

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
      this.template('Gruntfile.js', 'Gruntfile.js');
    }
  },

  install: function () {
    this.bowerInstall();
    this.npmInstall();
  }
});
