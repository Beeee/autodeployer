"use strict";
var http = require('http');
var pull = require('./pull');
var mvn = require('./maven');
var move = require('./move');
var runjar = require('./runapplication');
var globalprocess;

function sendResults(res, status, statusText, headers, result) {
    headers.Connection = "close";
    headers["Content-Type"] = "application/json";
    res.writeHead(status, statusText, headers);
    res.end(JSON.stringify(result));
}

function gitPull() {
    pull(function () {
        mvn(function () {
            move(function () {
                globalprocess = runjar(function () {
                    console.log("pull + mvn + move+run");
                });
            });
        });
    });
}

function routeCall(req, res, body) {
    console.log(body);
    if (globalprocess) {
        console.log("globalprocess not null");
        globalprocess.on('close', function (code, signal) {
            console.log('child process terminated due to receipt of signal ' + signal);
            gitPull();
        });
        globalprocess.kill('SIGKILL');
    } else {
        console.log("globalprocess null");
        gitPull();

    }

    return sendResults(res, 200, "OK", {}, {});
}



function methodNotAllowed(res) {
    var allowHeader = {"Allow": "POST"};
    sendResults(res, 405, "Method Not Allowed", allowHeader, {});
}

http.createServer(function (req, res) {
    console.log("Request recevied");
    if (req.method === "POST") {
        var body = "";
        req.on("data", function (data) {
            body += data;
        });

        req.on("end", function () {
            return routeCall(req, res, body);
        });
    } else {
        methodNotAllowed(res);
    }
}).listen(9083);

process.on('uncaughtException', function(err) {
    console.error("UNCAUGHT EXCEPTION...");
    console.error(err);
    console.error(err.stack);
});




