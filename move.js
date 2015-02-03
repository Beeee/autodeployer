"use strict";
//var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

module.exports = function (callback) {

    exec('copy /y central-1.0-SNAPSHOT.war .\\\..\\\..\\\ ', {cwd: "./../situp-backend-central/target"}, function (error) {
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
//    });situp-backend-censitup-backend-central\targettral\target
}