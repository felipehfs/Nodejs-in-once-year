var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html');
var form = fs.readFileSync('form.html');
const port = 80;
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	if (req.url == '/'){
		res.end(index);
	} else {
		res.end(form);
	}
}).listen(port, function () {
	console.log('Running on port ' + port);
});