'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var engine = require('ejs').render;
var htmlWiring = require('html-wiring');
var mkdirp = require('mkdirp');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  console.log('Dietz generator');
  
  yeoman.Base.apply(this, arguments);
  this.options = options;
  this.pkg = JSON.parse(htmlWiring.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'Which features would you like?',
    choices: [{
      name: 'Bootstrap',
      value: 'includeBootstrap',
      checked: true
    },{
      name: 'Handlebars',
      value: 'includeHandlebars',
      checked: true
    },{
      name: 'Backbone',
      value: 'includeBackbone',
      checked: false
    },{
      name: 'React',
      value: 'includeReact',
      checked: false
    },{
      name: 'React Bootstrap Components',
      value: 'includeReactBootstrap',
      checked: false
    },{
      name: 'Backbone React Components',
      value: 'includeReactBackbone',
      checked: false
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    var hasFeature = function (feat) {
      return features.indexOf(feat) !== -1;
    };

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeHandlebars = hasFeature('includeHandlebars');
    this.includeBackbone = hasFeature('includeBackbone');

    this.includeReact = hasFeature('includeReact');
    this.includeReactBootstrap = hasFeature('includeReactBootstrap');
    this.includeReactBackbone = hasFeature('includeReactBackbone');

    cb();
  }.bind(this));
};

AppGenerator.prototype.packageJSON = function () {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.gitIgnore = function () {
  this.copy('gitignore', '.gitignore');
};

AppGenerator.prototype.eslintrc = function () {
  this.copy('eslintrc', '.eslintrc');
};

AppGenerator.prototype.readme = function () {
  this.copy('README.md', 'README.md');
};

AppGenerator.prototype.js = function () {
  this.copy('scripts/index.js', 'app/scripts/index.js');
};

AppGenerator.prototype.mainStylesheet = function () {
  this.copy('styles/app.scss', 'app/styles/app.scss');
};

AppGenerator.prototype.writeIndex = function () {
  this.indexFile = htmlWiring.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = engine(this.indexFile, this);
};

AppGenerator.prototype.copyIcons = function () {
  this.fs.copy(
    this.templatePath('favicon.ico'),
    this.destinationPath('app/favicon.ico')
  );
};

AppGenerator.prototype.install = function() {
  this.npmInstall([], {'loglevel': 'error'});
};

AppGenerator.prototype.app = function () {
  mkdirp('app');
  mkdirp('app/scripts');
  mkdirp('app/styles');
  mkdirp('app/images');
  mkdirp('app/fonts');

  mkdirp('dist');
  mkdirp('dist/js');
  mkdirp('dist/css');
  mkdirp('dist/images');
  mkdirp('dist/fonts');

  this.write('app/index.html', this.indexFile);
};
