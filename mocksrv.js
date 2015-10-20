var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var argv = require('dot-argv');
var delay = argv.opts.d || 0;
var statusCode = argv.opts.s || 200;
var host = argv.opts.h || "localhost";
var port = argv.opts.p || 3000;
var outputFile = argv.opts.of;
var output = argv.opts.o;

if(argv.params[0] == "help") {
	console.log("usage: node mocksrv [-h host] [-p port] [-s status]");
	console.log("                    [-d delay] [-o output] [-of outputFile]");
	console.log("");
	console.log("Options:");
	console.log("-h host            The host where server will be binded, localhost is the default value");
	console.log("-p port            The port where server will be binded, 3000 is the default value");
	console.log("-d delay           The delay in millisecond before the response will be sent");
	console.log("-s statusCode      The status code returned by the server");
	console.log("-o output          The output string returned by the server");
	console.log("-of outputFile     The output file returned by the server");
	return;
}

var outStr = output;
if(outputFile) {
	outStr = fs.readFileSync(outputFile).toString();
}

console.log("listenig on", host+":"+port, "...");

var log = function() {
	console.log.apply(null, arguments);
}

express()
.use(bodyParser.json())
.all("*", function(req, res) {	
	log("\n*************************************************************");
	log(req.method, req.originalUrl);
	for(var h in req.headers) {
		log(h, ": \"", req.headers[h], "\"");	
	}
	log("\n");
	log(req.body);
	setTimeout(function(){
		var now = (new Date()).toLocaleTimeString();
		res.statusCode = statusCode;
		res.end(outStr || now);
	}, delay);
})
.listen(port, host);