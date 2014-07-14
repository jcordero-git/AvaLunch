'use strict';

/* Controllers */
(function(){

var user = [];

app= angular.module('myApp.controllers', [])  

 .controller('LoginCtrl', ['$scope', 'ValidateUser', '$location', function($scope, ValidateUser, $location) {
	$scope.value = "NO"; 
	$scope.username;
	$scope.password;

	user.username;
	user.password
	
	//$scope.Validate = function(product){
	$scope.Validate = function(){
	//alert($scope.username);
	//alert($scope.password);
	
     ValidateUser.get({'username': $scope.username,'password': $scope.password}, function(response){
	  // $scope.UserId=response.Id;
	  // $scope.value=response.Id;
	  //alert(response);
	  $scope.value="NO";
	   if(response.username)
		{
		$scope.value="OK";
		$location.path('/welcome');
		}
	  });
	 // product.reviews.push($scope.review);
     // $scope.review = {};	  
    };
	
    	  
  }])

    .controller('WelcomeCtrl', ['$scope', 'AngularIssues', function($scope, AngularIssues) {
	$scope.userName = gems;  
  
  }])
  
  .controller('MyCtrl1', ['$scope', 'AngularIssues', function($scope, AngularIssues) {
	$scope.data = {};   
    AngularIssues.query(function(response) {
      // Assign the response INSIDE the callback
      $scope.data.issues = response;
    });	
	
  
  }])
  
  .controller('MyCtrl2', ['$scope', 'JsonService', function($scope, JsonService) {

	$scope.datau = {};   
    JsonService.query(function(response) {
      // Assign the response INSIDE the callback
      $scope.datau.usersweb = response;
    });	
	
	$scope.dataValue="Valor seteado en Ctrl2";
	
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





})();