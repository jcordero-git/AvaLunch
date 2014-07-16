'use strict';

/* Controllers */


var app= angular.module('myApp.controllers', ['myApp.autocomplete','ui.bootstrap'])  

.controller('TemplateCtrl',['$scope','loggedInStatus', '$location',function($scope,loggedInStatus, $location){
	$scope.panelLogin=true;
	$scope.panelSingUp=false;
	$scope.panelForgot=false;
	$scope.logged=loggedInStatus.getLoggedIn(); 	
	
	if($scope.logged==false)
		{						
		$location.path('/login');
		}
			
	$scope.ShowPanels = function(login,singUp,forgot){
		$scope.panelLogin=login;
		$scope.panelSingUp=singUp;
		$scope.panelForgot=forgot;
		};
		/*
	$scope.ShowPanelSingUp = function(){
		$scope.panelLogin=false;
		$scope.panelSingUp=true;
		$scope.panelForgot=false;
		};
	$scope.ShowPanelForgot = function(){
		$scope.panelLogin=false;
		$scope.panelSingUp=false;
		$scope.panelForgot=true;
		};
		*/
	
	
}])

 .controller('LoginCtrl', ['$scope', 'ValidateUser', '$location', 'loggedInStatus', '$http', 'JsonService', 'ForgotPassword' , function($scope, ValidateUser, $location, loggedInStatus, $http, JsonService, ForgotPassword) {
 	
	$http.defaults.useXDomain = true; 	
	$scope.statusMessage="*****";	
	$scope.newUserModel={};
	$scope.newUserModel.username="";
	$scope.newUserModel.password="";
	$scope.newUserModel.email="";
	
	$scope.Validate = function(){
    ValidateUser.get({'username': $scope.newUserModel.username,'password': $scope.newUserModel.password}, function(response){	  
	   if(response.username)
		{				
		loggedInStatus.setUsername(response.username);
		loggedInStatus.setLoggedIn(true);
		$location.path('/index');
		}
		else
		{
		$scope.statusMessage="El usuario y la contraseña no coinciden";
		}
	  });
    };
	
	$scope.RegisterUser = function(){
	JsonService.save($scope.newUserModel, function(response){
	if (response)
		{
		alert("Usuario registrado exitosamente");
		$scope.Validate();
		}
	else {alert("error");}
	
	});	
	};
	
	$scope.ForgotPassword = function(){
	 ForgotPassword.get({'email': $scope.newUserModel.email}, function(response){	  
	   if(response.username)
		{			
		alert("Usuario: "+response.username);
		}
		else
		{
		$scope.statusMessage="Email no registrado.";
		}
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



app.controller('tasksController', ['$scope','JsonServiceList', 'JsonServiceListDeleteById', 'JsonServiceMenu','$filter', function($scope, JsonServiceList,JsonServiceListDeleteById,JsonServiceMenu,$filter) {
 
  $scope.newListModel={};
  $scope.newListModel.username="";
  $scope.newListModel.menuname="";
  $scope.newListModel.date="";  
  
 
 // getTask(); // Load all available tasks
  getMenu(); // Load all countries with capitals
  getList();
  $scope.date = new Date();

  function getMenu(){
  //$scope.datamenu = {};   
    JsonServiceMenu.query(function(response) {
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

  $scope.RegisterList = function(username,menuname){
	var dishName;
	
	var day = new Date();   
    var dayFormat= $filter('date')(day,'dd-MM-yyyy HH:MM');   
		
    if(typeof menuname == 'object'){
      dishName = menuname.menuname;
    }else{
      dishName = menuname;
    }	
	
	$scope.newListModel.username=username;
	$scope.newListModel.menuname=dishName;
	$scope.newListModel.date=dayFormat;	
	
	JsonServiceList.save($scope.newListModel, function(response){
	if (response)
		{
		getList();
		$scope.taskInput = "";
		}
	else {alert("error");}
	
	});	
	};
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
      if(confirm("Está seguro de querer borrar su pedido?")){        
		JsonServiceListDeleteById.delete({'id': task})
		getList();
		/*, function(response)
			{
			alert(1);
			getList();
			if (response)
			{
			alert("User deleted successfully..");			
			}
			else {alert("error");}
			}
			)
			*/
			
		//$http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
          
        }      
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

