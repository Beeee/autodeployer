"use strict";
var spawn = require('child_process').spawn;
var config = require("./config");
var globaljava = null;
var killCallback;


exports.startServer = function () {
    globaljava = spawn('java', ['-jar', config.jarname], {cwd: config.runningfolder});

    globaljava.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    globaljava.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal ' + signal);
        globaljava = null;
        if (killCallback) {
            killCallback();
        }
    });
}

exports.isRunning = function() {
    return globaljava != null;

}

exports.killServer = function(callback) {
        killCallback=callback;
        globaljava.kill();
}





