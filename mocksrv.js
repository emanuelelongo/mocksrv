var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var argv = require('dot-argv');
var delay = argv.opts.d || 0;
var errorCode = argv.opts.e;
var port = argv.opts.p || 3000;
var outputFile = argv.opts.of;
var output = argv.opts.o;

if(argv.params[0] == "help") {
	console.log("usage: node mocksrv [-p port] [-d delay] [-e errorCode]");
	return;
}

var outStr = argv.opts.o;
if(outputFile) {
	outStr = fs.readFileSync(outputFile).toString();
}

console.log("listenig on port", port, "...");

express()
.use(bodyParser.json())
.all("*", function(req, res) {
	console.log("###", (new Date()).toLocaleTimeString(), "###");
	console.log("request:", req.path);
	console.log("query:", req.query);
	console.log("headers:", req.headers);
	console.log("body:", req.body);
	setTimeout(function(){
		var now = (new Date()).toLocaleTimeString();
		console.log("###", now, "###");
		if(errorCode) {
			res.statusCode = errorCode;
			console.log("sent", errorCode, "error");
			res.end();
			return;
		}
		console.log("response sent:", outStr || now);
		res.end(outStr || now);
	}, delay);
})
.listen(port);