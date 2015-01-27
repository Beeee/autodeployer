"use stict";
var maven = require('maven-deploy');
var config = require('./maven.json');

module.exports = function (callback) {
    maven.config(config);
    maven.install();
}