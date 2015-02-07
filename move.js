"use strict";
var spawn = require('child_process').spawn;
var config = require("./config");

module.exports = function (callback) {
    var mvn = spawn('cp', [config.jarname, config.runningfolder], {cwd: config.repoDir + config.compileFolder});

    console.log(config.repoDir + config.compileFolder);
    console.log(config.jarname);
    console.log(config.runningfolder);

    mvn.on('close', function (code, signal) {
        callback();
    });

}