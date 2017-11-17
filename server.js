var express = require("express");
var path= require("path");
var session = require("express-session");
var app = express();

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.use(express.static(path.join(__dirname, './client')));

app.listen(8000, function() {
	console.log('listening on port 8000');
});

