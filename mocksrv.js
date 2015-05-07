var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var argv = require('dot-argv');
var delay = argv.opts.d || 0;
var errorCode = argv.opts.e;
var port = argv.opts.p || 3000;
var outputFile = argv.opts.of;
var output = argv.opts.o;

if(argv.params[0]) {
	console.log("usage: node mocksrv [-p port] [-d delay] [-e errorCode]");
	return;
}

var outStr = argv.opts.o;
if(outputFile) {
	outStr = fs.readFileSync(outputFile).toString();
}

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
		res.end(outStr || now);
		if(errorCode) {
			res.statusCode = errorCode;
			console.log("###", (new Date()).toLocaleTimeString(), "###");
			console.log("sent", errorCode, "error");
			console.log("response:", outStr || now);
			return;
		}
		console.log("###", now, "###");
		console.log("response sent:", outStr || now);
	}, delay);
})
.listen(port);