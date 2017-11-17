var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		create: function(req, res) {
			console.log(req.body.name, "in Users.js");

			User.findOne({name: req.body.name}, function(err, results) {
				if(!results) {
					console.log(req.body.name, "here");
					var user = new User({name: req.body.name});
					user.save(function (err, results) {
						if (err) {return handleError(err);}
						else {
							console.log("in else");
							res.json(results);
						}
					})
				}
				else{
					res.json(results);
				}
				if(err) {
					console.log("errors");
				} 
			});

			
		}
	}
})();