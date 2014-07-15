'use strict';

/* Controllers */
(function(){

//var user = [];
//var username1;
//var username2="hola 2777";

var app= angular.module('myApp.controllers', [])  

.controller('TemplateCtrl',['$scope','loggedInStatus', '$location',function($scope,loggedInStatus, $location){
	$scope.panelLogin=true;
	$scope.logged=loggedInStatus.getLoggedIn(); 	
	
	if($scope.logged==false)
		{						
		$location.path('/login');
		}
			
	$scope.PanelLogin = function(status){
		$scope.panelLogin=status;
		};
	
	
}])

 .controller('LoginCtrl', ['$scope', 'ValidateUser', '$location', 'loggedInStatus', '$http', 'JsonService' , function($scope, ValidateUser, $location, loggedInStatus, $http, JsonService) {
 
	
	$http.defaults.useXDomain = true;
 	
	$scope.username;
	$scope.password;
	$scope.statusMessage="Welcome User";
	
	$scope.newUserModel={};
	$scope.newUserModel.username="";
	$scope.newUserModel.password="";
	$scope.newUserModel.email="";
	

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
		$location.path('/index');
		}
		else
		{
		$scope.statusMessage="Password and Username does not match";
		}
	  });
	 // product.reviews.push($scope.review);
     // $scope.review = {};	 

    };
	
	$scope.RegisterUser = function(){
	JsonService.save($scope.newUserModel, function(response){
	if (response)alert("User registered successfully..");
	else {alert("guardado");}
	
	});	
	};
	
    	  
  }])

    .controller('IndexCtrl', ['$scope', 'JsonServiceMenu', 'loggedInStatus' , '$location', function($scope, JsonServiceMenu, loggedInStatus, $location) {
	
	$scope.datamenu = {};   
    JsonServiceMenu.query(function(response) {
      $scope.datamenu.menu = response;
    });	
	
	//alert(loggedInStatus.getUsername());
	$scope.username = loggedInStatus.getUsername();
	$scope.logged=loggedInStatus.getLoggedIn(); 
	
	$scope.username
	
	$scope.LogOut = function(){
		$scope.logged=false;
		loggedInStatus.setLoggedIn(false);
		$location.path('/login');
		//alert($scope.logged);
		};
 	
  
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



app.controller('tasksController', ['$scope','JsonServiceList', function($scope, JsonServiceList) {
 
 
 // getTask(); // Load all available tasks
  getMenu(); // Load all countries with capitals
  getList();
  $scope.date = new Date();

  function getMenu(){
  //$scope.datamenu = {};   
    JsonServiceList.query(function(response) {
      $scope.menu = response;
    });	
	}
  
  function getList(){
    //$scope.datalist = {};   
    JsonServiceList.query(function(response) {
      $scope.tasks = response;
    });
  };
  
  
  setInterval(function(){
    getList();
  },5000);

  /*
  
  function getMenu(){
    $http.get("ajax/getMenu.php").success(function(data){
      $scope.menu = data;
    });
  };
  function getTask(){
    $http.post("ajax/getTask.php").success(function(data){
      $scope.tasks = data;

    });
  };
  $scope.addTask = function (task) {
    var dishName;

    if(typeof task == 'object'){
      dishName = task.platillo;
    }else{
      dishName = task;
    }

    $http.post("ajax/addTask.php?task="+dishName).success(function(data){
      getTask();
      console.log(task);
      $scope.taskInput = "";
    });
  };
   */
  $scope.deleteTask = function (task) {
    $scope.hour = new Date();
    if ($scope.hour.getHours()>=11) {	
      if(confirm("Are you sure to delete your lunch?")){
        alert("delete task code for taskId:"+ task);
		//$http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
          getList();
        };
      
    }else{
      getList();
    }
  };
 
  $scope.checkTime = function () {
    $scope.hour = new Date();
    if ($scope.hour.getHours()<=11) {
      return false;
    };
    return true;
  };
/*
  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
    $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
      getTask();
    });
  };
*/
}]);


})();