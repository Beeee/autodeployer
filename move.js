"use strict";
var spawn = require('child_process').spawn;
var config = require("./config");

module.exports = function (callback) {
    var mvn = spawn('cp', [config.jarname, config.runningfolder], {cwd: config.repoDir + config.compileFolder});

    mvn.on('close', function (code, signal) {
        console.log(config.jarname + " moved from " + config.repoDir + config.compileFolder + " to " + config.runningfolder);
        callback();
    });

}