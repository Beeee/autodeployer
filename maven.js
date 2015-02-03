"use strict";
//var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

module.exports = function (callback) {

    exec('mvn clean install', {cwd: "../situp-backend-central/"}, function (error) {
        console.log("maven");
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        if (callback) {
            callback();
        }
    });


//    mvn = spawn('mvn', ['clean install'], {cwd: "../situp-backend-central/"});
//
//    mvn.stdout.on('data', function (data) {
//        console.log(data);
//    });
}