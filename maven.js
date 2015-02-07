"use strict";
var spawn = require('child_process').spawn;
var config = require("./config");

module.exports = function (callback) {
    var mvn = spawn('mvn', ['clean', 'install'], {cwd: config.repoDir});

    mvn.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    mvn.on('close', function (code, signal) {
        callback();
    });
}