"use strict";

var testingApp = angular.module('TestingApp', []);

testingApp.controller('testingCtrl', ['$scope', function($scope) {
    console.log($scope.email);
}]);