'use strict';

/* Controllers */

app= angular.module('myApp.controllers', [])
  
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  
  .controller('MyCtrl2', ['$scope', function($scope, $http) {
	$scope.dataValue=2;		
	
	/*
	$http.get('http://localhost:3000/user')
		.success(function(data) {
			$scope.userList = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		*/
	
	$scope.driversList = [
      {
          Driver: {
              givenName: 'Sebastian',
              familyName: 'Vettel'
          },
          points: 322,
          nationality: "German",
          Constructors: [
              {name: "Red Bull"}
          ]
      },
      {
          Driver: {
          givenName: 'Fernando',
              familyName: 'Alonso'
          },
          points: 207,
          nationality: "Spanish",
          Constructors: [
              {name: "Ferrari"}
          ]
      }
    ];
	
	
  }]);
  
app.controller("testCtrl3", function () {

	alert("view 1");
  

});
