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
var app = angular.module("MainModule");

/** 
  * @line var MainControl = function($scope, $http, $interval, $log, )
  * @desc this is the controller
  * @param $scope, $http, $interval, $log,
  * @info
		- $scope, $http, $interval, $log are all services
  * @return null 
*/

var MainControl = function($scope, $interval, $location){
	var person = {
		firstName: 'damien',
		secondName: 'shaw'
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
		if(countdownInterval) {
			$interval.cancel(countdownInterval);
			$scope.countdown = null;
		}

		$location.path("/user/" + username);
	};

	$scope.username = "angular";
	$scope.person = person;
	$scope.countdown = 20;
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
app.controller("MainController", ["$scope","$interval", "$location", MainControl]);

}());
