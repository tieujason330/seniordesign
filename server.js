var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static(__dirname + '/app'));

// allows the browser to GET the bower files
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.listen(port);
