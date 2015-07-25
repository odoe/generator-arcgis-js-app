'use strict';
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');
var esprima = require('esprima-fb');
var eswalk = require('esprima-walk');
var escodegen = require('escodegen');
var fsx = require('fs-extra');

module.exports = yeoman.generators.NamedBase.extend({
  askForModuleName: function() {
    var prompts = [{
      type: 'input',
      name: 'name',
      default: 'model',
      message: 'The Model name?',
    }];
  },
  writing: function () {
    this.on('end', function () {
      var p = this.destinationPath('tests/intern.js');
      var f = this.read(p, 'utf-8');
      var tree = esprima.parse(f);
      var t = 'tests/unit/models-model' + _.dasherize(this.name) + '.js';
      eswalk(tree, function(node) {
        if (node.type === 'Property' && node.key.name === 'suites') {
          node.value.elements.push({
            type: 'Literal',
            value: t,
            raw: t
          });
        }
      }.bind(this));
      var code = escodegen.generate(tree);
      fsx.outputFile(p, code);
    }.bind(this));
    this.fs.copyTpl(
      this.templatePath('src/models/_Model.js'),
      this.destinationPath('src/app/models/model-'+this.name+'.js'),
      {_:_, name: this.name}
    );
    // tests
    this.fs.copyTpl(
      this.templatePath('tests/_Model.js'),
      this.destinationPath('tests/unit/models-model' + _.dasherize(this.name) + '.js'),
      {_:_, name: this.name}
    );
  }
});
