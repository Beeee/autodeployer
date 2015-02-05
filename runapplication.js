"use strict";
var spawn = require('child_process').spawn;
var globaljava;

module.exports = function (callback) {

    globaljava = spawn('java', ['-jar central-1.0-SNAPSHOT.jar'], {cwd: "../situp-backend-central/target/"});

    globaljava.stdout.on('data', function (data) {
        console.log(data);
    });

    globaljava.on('close', function (code, signal) {
        callback();
    });
}
