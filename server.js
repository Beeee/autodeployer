"use strict";
var http = require('http');

function sendResults(res, status, statusText, headers, result) {
    headers.Connection = "close";
    headers["Content-Type"] = "application/json";
    res.writeHead(status, statusText, headers);
    res.end(JSON.stringify(result));
}

function routeCall(req, res, body) {
    console.log(body);
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
}).listen(8080);

process.on('uncaughtException', function(err) {
    console.error("UNCAUGHT EXCEPTION...");
    console.error(err);
    console.error(err.stack);
});




