"use strict";
var exec = require('child_process').exec;

module.exports = function (callback) {

    return exec('java central-1.0-SNAPSHOT.jar', {cwd: "./../"}, function (error) {
        console.log("run");
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        callback();

    });
}