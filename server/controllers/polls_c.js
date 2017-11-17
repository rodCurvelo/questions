var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		show: function(req, res) {
			Poll.find({}, function(err, results){
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		showone: function(req, res) {
			Poll.findOne({_id: req.params.id}, function(err, result){
				if(err) {
					console.log(err);
				} else {
					res.json(result);
				}
			})
		},
		create: function(req, res) {
			console.log(req.params.id, "id");
			console.log(req.body, "in polls_c.js");

			User.findOne({_id: req.params.id}, function(err, user) {
				console.log(user);
				var poll = new Poll(req.body);
		        
		        poll._created_by = user._id;
		        poll._created_by_name  = user.name;
		        user.polls.push(poll);
		        
		        poll.save(function(err){
		            user.save(function(err){
				        if (err) {
				                   console.log('Error');
				      			 } 
		            });
		        });
				
			});

			
		},
		update: function(req, res) {
			console.log(req.params.id, "id");
			console.log(req.body.option, "in here");
			var option = req.body.option

			Poll.findOne({_id: req.params.id}, function(err, poll) {
				console.log(poll);
				switch (option) {
					case 1:
						poll.option1_votes ++;
						break;
					case 2:
						poll.option2_votes ++;
						break;
					case 3:
						poll.option3_votes ++;
						break;
					case 4:
						poll.option4_votes ++;
						break;
				}
				poll.save(function (err, results) {
						if (err) {return handleError(err);}
						else {
							res.json(results);
						}
				});
			})


		},
		remove: function(req, res) {
			Poll.remove({_id: req.params.id}, function(err, results) {
				if(err) {
					console.log(err);
				} else {
					console.log(results);
					res.json(results);
				}
			})
		}
	}
})();