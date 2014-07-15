'use strict';

/* Controllers */
(function(){
1
//var user = [];
//var username1;
//var username2="hola 2777";

app= angular.module('myApp.controllers', [])  

.controller('TemplateCtrl',['$scope','loggedInStatus',function($scope,loggedInStatus){
	$scope.panelLogin=true;
	$scope.logged=loggedInStatus.getLoggedIn(); 	
	
	$scope.LogOut = function(){
		$scope.logged=false;
		loggedInStatus.setLoggedIn(false);
		//alert($scope.logged);
		};
	$scope.PanelLogin = function(status){
		$scope.panelLogin=status;
		};
	
	
}])

 .controller('LoginCtrl', ['$scope', 'ValidateUser', '$location', 'loggedInStatus', '$http', function($scope, ValidateUser, $location, loggedInStatus, $http) {
 
	
	$http.defaults.useXDomain = true;
 	
	$scope.username;
	$scope.password;
	$scope.statusMessage="Welcome User";

	//user.username="Jose";
	//user.password;
	
	//$scope.Validate = function(product){
	$scope.Validate = function(){
	//alert($scope.username);
	//alert($scope.password);
	
    ValidateUser.get({'username': $scope.username,'password': $scope.password}, function(response){
	  // $scope.UserId=response.Id;
	  // $scope.value=response.Id;
	 // alert("hola");
	 
	   if(response.username)
		{				
		loggedInStatus.setUsername(response.username);
		loggedInStatus.setLoggedIn(true);
		$location.path('/welcome');
		}
		else
		{
		$scope.statusMessage="Password and Username does not match";
		}
	  });
	 // product.reviews.push($scope.review);
     // $scope.review = {};	  
    };
	
    	  
  }])

    .controller('WelcomeCtrl', ['$scope', 'AngularIssues', 'loggedInStatus', function($scope, AngularIssues, loggedInStatus) {
	
	
	//alert(loggedInStatus.getUsername());
	$scope.username = loggedInStatus.getUsername(); 	
  
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