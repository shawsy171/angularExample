(function(){
/** 
  * @line angular.module("MainModule", []);
  * @desc this creates the angular module
  * @param 
  * @info
		-
  * @return null 
  //var app = angular.module("module name", [dependancy array]);
*/
var app = angular.module("MainModule", []);

/** 
  * @line var MainControl = function($scope, $http, $interval, $log, )
  * @desc this is the controller
  * @param $scope, $http, $interval, $log,
  * @info
		- $scope, $http, $interval, $log are all services
  * @return null 
*/

var MainControl = function($scope, github, $interval, $log, $anchorScroll, $location){
	var person = {
		firstName: 'damien',
		secondName: 'shaw'
	};

	/** 
		* @name onUserComplete
		* @desc passes an object of user data to $scope.user
		* @param object "response" - $http.get "response" object
		* @return null 
	*/
	var onUserComplete = function(data) {
		$scope.user = data;
		$scope.error = "";
		// $http.get($scope.user.repos_url)
		github.getRepos($scope.user)
			.then(onRepos, onError );
	};

	/** 
		* @name onRepo
		* @desc passes an object of user data to $scope.repos
		* @param object "response" - $http.get "response" object
		* @return null 
	*/
	var onRepos = function(data) {
		$scope.repos = data;
		$location.hash("userDetails");
		$anchorScroll();
	};
	/** 
		* @name onError
		* @desc provides an error message 
		* @param object "reason" - $http.get "reason" object
		* @return null
	*/
	var onError = function(reason){
		$scope.error = "Data could not be found, status: " + reason.status;
		// $scope.error = reason;
	};

	/** 
		* @name decrementCountdown
		* @desc decrements the value of "$scope.countdown" by 1 until it is 0
		* @param null
		* @return null
	*/

	var decrementCountdown = function() {
		$scope.countdown -= 1;
		if($scope.countdown < 1) {
			$scope.search($scope.username);
		}
	};

	var countdownInterval = null;
	var startCountdown = function() {
		countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
	};
	
	/** 
		* @name search
		* @desc calls the git hub api using the username
		* @param string username - from searchUser form 
		* @return null 
		- @line $http.get("https://api.github.com/users/getify")
		- @info
			- this uses the github api, this can be checked by just putting it into the browser "https://api.github.com/users/getify"

	*/

	$scope.search = function(username) {
		$log.info('searching for ' + username);
		github.getUser(username)
			.then(onUserComplete, onError);
		if(countdownInterval) {
			$interval.cancel(countdownInterval);
			$scope.countdown = null;
		}
	};

	$scope.username = "angular";
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.person = person;
	$scope.countdown = 5;
	startCountdown();
};


/**
  * @line app.controller("MainController", ["$scope","$http",MainControl]);
  * @desc register the controllers to the module 
  * @param string $msg - the message to be displayed
  * @return null 
  * @info
		- ng-controller is in the HTML which connects to MainController
		- MainControl is the controller with the $scope parameter in the script
		- Passing the array into the second controller argument allows you to pass in the $scope and $http service to MainControl as parameters even if the code is minified 
		// app.controller("ng-controller", MainControl);
*/
app.controller("MainController", ["$scope","github","$interval","$log", "$anchorScroll", "$location", MainControl]);

}());
