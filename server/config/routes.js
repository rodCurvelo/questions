var bodyParser = require("body-parser");
var users = require('./../controllers/users_c.js');
var polls = require('./../controllers/polls_c.js');
  
module.exports = function(app) {
	app.use(bodyParser.json());

	app.post('/user', function(req, res){
		users.create(req, res);
	});
	app.put('/poll/update/:id', function(req, res){
		
		polls.update(req, res);
	});
	app.get('/poll', function(req, res){
		polls.show(req, res);
	});
	app.get('/poll/:id', function(req, res){
		polls.showone(req, res);
	});
	app.post('/poll/:id', function(req, res){
		polls.create(req, res);
	});
	app.delete('/poll/:id', function(req, res){
		polls.remove(req, res);
	});
	
};