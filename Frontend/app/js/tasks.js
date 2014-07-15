//Define an angular module for our app
var app = angular.module('myApp', ['autocomplete', 'ui.bootstrap']);

app.controller('tasksController', function($scope, $http) {
  getTask(); // Load all available tasks
  getMenu(); // Load all countries with capitals
  $scope.date = new Date();

  
  
  setInterval(function(){
    getTask();
  },5000);

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
      if(data.error){
        $scope.errordetected = data.error;
      }
      getTask();
      console.log(data);
      $scope.taskInput = "";
    });
  };
  $scope.deleteTask = function (task) {
    $scope.hour = new Date();
    if ($scope.hour.getHours()<=11) {
      if(confirm("Are you sure to delete this line?")){
        $http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
          getTask();
        });
      }
    }else{
      getTask();
    }
  };
  $scope.checkTime = function () {
    $scope.hour = new Date();
    //console.log($scope.hour.getHours());
    if ($scope.hour.getHours()>=11) {
      return false;
    };
    return true;
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
    $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
      getTask();
    });
  };

});