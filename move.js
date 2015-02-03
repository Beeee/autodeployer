"use strict";
//var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

module.exports = function (callback) {

    exec('copy /y central-1.0-SNAPSHOT.jar .\\\..\\\..\\\ ', {cwd: "./../situp-backend-central/target"}, function (error) {
        console.log("move");
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        callback();
    });
}