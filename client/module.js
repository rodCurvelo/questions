var myApp = angular.module('myApp', ['ngRoute', 'ngCookies'] );

myApp.controller('usersController', ['$scope', '$cookies', '$location', 'userFactory', function($scope, $cookies, $location, userFactory){

    $scope.currentUser = {};

    if($cookies.get("name")) {
        $scope.currentUser['name'] = $cookies.get('name');
        $scope.currentUser['_id'] = $cookies.get('_id');
    }
    $scope.addUser = function(){
        // console.log($scope.newUser, "in modules");
        userFactory.addUser($scope.newUser, function(data){
            $scope.currentUser = data;
            $cookies.put('name', data.name);
            $cookies.put('_id', data._id);
            console.log($scope.currentUser, "logging current user");
            $location.path('/dashboard/' + $scope.currentUser._id);
        });
    }
    $scope.logoutUser = function(){
        // console.log("logoutUser");
        $cookies.remove("name");
        $cookies.remove("_id");
        // console.log("logged out", $scope.currentUser);
        $scope.currentUser = {};
        $location.path('/');
    };
}]);



myApp.controller('pollsController', ['$scope', '$cookies', '$routeParams', '$location', 'pollFactory', function($scope, $cookies, $routeParams, $location, pollFactory){

    $scope.polls = pollFactory.getPolls(function(data) {
        $scope.polls = data;
    });
    $scope.the_poll = pollFactory.getOnePoll($routeParams.id, function(poll){

    	$scope.the_poll = poll;

    })

    $scope.addPoll = function(){
        console.log($scope.newPoll, "in modules");
        var id = $cookies.get('_id');

        pollFactory.addPoll($scope.newPoll, id, function(data){
            $scope.addedPoll = data;
            

            $scope.polls = pollFactory.getPolls(function(data) {
     
                $scope.polls = data.polls;
            });
        });
    	$location.path('/dashboard/' + $cookies._id);
    	$scope.polls = pollFactory.getPolls(function(data) {
              
                $scope.polls = data.polls;
         });

    }
    $scope.addVote = function(option) {
    	var option = option;
    	var id = $routeParams.id;
    	pollFactory.addVote(option, id, function(data){
    		console.log(data, "added");
            pollFactory.getOnePoll($routeParams.id, function(poll){

                $scope.the_poll = poll;

            })

    	});
    }
    $scope.removePoll = function(data){
    	pollFactory.removePoll(data, function(success) {
    		console.log(success);

    		pollFactory.getPolls(function(data) {
                console.log(data);
                $scope.polls = data;
        	})
        });
    }
}]);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: './views/partials/main.html'
    })
    .when('/dashboard/:id', {
    	templateUrl: './views/partials/dashboard.html'
    })
    .when('/new', {
    	templateUrl: './views/partials/new.html'
    })
    .when('/poll/:id', {
    	templateUrl: './views/partials/poll.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});