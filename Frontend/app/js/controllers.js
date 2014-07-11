'use strict';

/* Controllers */

app= angular.module('myApp.controllers', [])
  
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  
  .controller('MyCtrl2', ['$scope', '$http','$templateCache', function($scope, $http, $templateCache) {
	$scope.dataValue=2;		
	
	$scope.method = 'GET';
    $scope.url = 'http://rest-service.guides.spring.io/greeting';
	/*
	$http.get('http://rest-service.guides.spring.io/greeting')
		.success(function(data) {
			$scope.userList = data;
			console.log(data);
		});
	alert(data);
	*/
	
	var userList1= [{id:'hola'}];
	
	$http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        success(function(data, status) {
          $scope.userList = data;	
			alert(data);	  
        }).
        error(function(data, status) {
         
      });
	
	
	
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
