"use strict";

var testingApp = angular.module('TestingApp', []);

testingApp.controller('testingCtrl', ['$scope', function($scope) {
    $scope.validateBday = function() {
    	$scope.signupForm.birthdate.$setValidity("validDate", true);
    	$scope.signupForm.birthdate.$setValidity("validAge", true);
    	var date = Date.parse($scope.birthdate);
        var age = getAge(date);
    	if(date.toString() == 'NaN') {
    		// date is not a number
    		$scope.signupForm.birthdate.$setValidity("validDate", false);
    	} else {
    		if(age < 13) {
    			$scope.signupForm.birthdate.$setValidity("validAge", false);
    		}
    	}
    }
    // helper method to get the right date format
	function getAge(date) {
	    var today = new Date();
	    var birthDate = new Date(date);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }    
	    return age;
	}
}]);