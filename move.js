"use strict";
//var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

module.exports = function (callback) {

    exec('copy /y test.txt .\\\..\\\..\\\ ', {cwd: "./../situp-backend-central/target"}, function (error) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        callback();
    });
}