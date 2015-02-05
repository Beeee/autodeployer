"use strict";
var spawn = require('child_process').spawn;

module.exports = function (callback) {
    var mvn = spawn('mvn', ['clean install'], {cwd: "../situp-backend-central/"});

    mvn.stdout.on('data', function (data) {
        console.log(data);
    });

    mvn.on('close', function (code, signal) {
        callback();
    });
}