"use strict";
var exec = require('child_process').exec;

module.exports = function (callback) {

    return exec('java test.jar', {cwd: "./../"}, function (error) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        callback();

    });
}