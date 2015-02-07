"use strict";
var http = require('http');
var pull = require('./pull');
var mvn = require('./maven');
var move = require('./move');
var applicatonStarter = require('./runapplication');

function sendResults(res, status, statusText, headers, result) {
    headers.Connection = "close";
    headers["Content-Type"] = "application/json";
    res.writeHead(status, statusText, headers);
    res.end(JSON.stringify(result));
}

function gitPullBuildMoveStart() {
    pull(function () {
        mvn(function () {
            move(function () {
                applicatonStarter.startServer();
            });
        });
    });
}

function routeCall(req, res, body) {
    if (applicatonStarter.isRunning()) {
        applicatonStarter.killServer(function () {
            gitPullBuildMoveStart();
        });
    } else {
        gitPullBuildMoveStart();
    }
    return sendResults(res, 200, "OK", {}, {});
}



function methodNotAllowed(res) {
    var allowHeader = {"Allow": "POST"};
    sendResults(res, 405, "Method Not Allowed", allowHeader, {});
}

http.createServer(function (req, res) {
    if (req.method === "POST") {
        var body = "";
        req.on("data", function (data) {
            body += data;
        });

        req.on("end", function () {
            return routeCall(req, res, body);
        });
    } else {
        console.log("methodNotallowed");
        methodNotAllowed(res);
    }
}).listen(9083);

process.on('uncaughtException', function(err) {
    console.error("UNCAUGHT EXCEPTION...");
    console.error(err);
    console.error(err.stack);
});




