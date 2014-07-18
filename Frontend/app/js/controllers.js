'use strict';

/* Controllers */
(function(){

var DueHour=23;

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
		alert("Su contraseña es: "+response.password);
		}
		else
		{
		$scope.statusMessage="Email no registrado.";
		}
	  });
	};
	
    	  
  }])

    .controller('IndexCtrl', ['$scope', 'JsonServiceMenu', 'loggedInStatus' , '$location', function($scope, JsonServiceMenu, loggedInStatus, $location) {
	
	$scope.DueHour=DueHour;
	
	
	
	//alert(loggedInStatus.getUsername());
	$scope.username = loggedInStatus.getUsername();
	$scope.logged=loggedInStatus.getLoggedIn(); 
		
	$scope.LogOut = function(){
		$scope.logged=false;
		loggedInStatus.setLoggedIn(false);
		$location.path('/login');
		//alert($scope.logged);
		};
		
	
  $scope.checkTime = function (currentUser,listUser) {
    $scope.hour = new Date();
    if ($scope.hour.getHours()>=DueHour) {
      return false;
    }
	else{		
		if(currentUser==listUser)
			{
				return true;
			}
			else
			{
				return false;
			}		
		}    
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




app.controller('listController', ['$scope','JsonServiceList', 'JsonServiceListByDate', 'JsonServiceListDeleteById', 'JsonServiceMenu', 'JsonServiceMenuDeleteById','$filter', '$rootScope' , 'ValuesBetweenCtrl', 'JsonServiceMenuFindByName', function($scope, JsonServiceList,JsonServiceListByDate, JsonServiceListDeleteById,JsonServiceMenu,JsonServiceMenuDeleteById, $filter, $rootScope, ValuesBetweenCtrl,JsonServiceMenuFindByName) {

  $scope.newListModel={};
  $scope.newListModel.username="";
  $scope.newListModel.menuname="";
  $scope.newListModel.date="";
  $scope.date = new Date(); 
  
  
  
  $rootScope.$on('loadSelectedMenuItem', function(event, data){	  
	$scope.taskInput=ValuesBetweenCtrl.getvalueObject();
	});
	
	
	$rootScope.$on('applyFilterByDate', function(event, data){	  
	 $scope.date=ValuesBetweenCtrl.getvalueString();
	 getList();
	});
  
 
 // getTask(); // Load all available tasks
  getMenuAutoCompleter(); // Load all countries with capitals  
  $scope.date = new Date();
  getList();

 
  function getMenuAutoCompleter(){   
    JsonServiceMenu.query(function(response) {
      $scope.menu1 = response;
	  
    });	
	}
	
  
  function getList(){
    //$scope.datalist = {}; 
    var dateFormat= $filter('date')($scope.date,'dd-MM-yyyy'); 
    JsonServiceListByDate.query({'date': dateFormat}, function(response) {
      $scope.tasks = response;
    });
  };
  
  
   setInterval(function(){
    getList();
	getMenuAutoCompleter();
  },5000);
   
  
  /*
  $scope.SelectMenu = function(menuname){
		alert(menuname);	
		$scope.taskInput=menuname;		
		};
*/
  

  
  $scope.RegisterList = function(username,menuname){
	var dishName;
	var idMenu=0;
	var existMenu=false;
	
	var day = new Date();   
    var dayFormat= $filter('date')(day,'dd-MM-yyyy HH:MM');   
		
    if(typeof menuname == 'object'){
      dishName = menuname.menuname;
	  idMenu   = menuname._id;
    }else{
      dishName = menuname;
    }	
	
	$scope.newListModel.username=username;
	$scope.newListModel.menuname=dishName;
	$scope.newListModel.date=dayFormat;

	//select by ID Menus
	
	if(idMenu==0)
	{
	/*JsonServiceMenuFindByName.get({'menuname': dishName},function(response){
		alert(response._id);
				if (response!='undefined')
					{
					existMenu=true;
					alert(1);
					
					JsonServiceList.save($scope.newListModel, function(response){
					if (response)
						{
						getList();
						$scope.taskInput = "";		
						}
					else {alert("error");}
					
					});	
					
					}
				else {
					alert(2);
					 }
			if(existMenu==false)
				{*/
				alert("El plato seleccionado aun no ha sido registrado");
				/*}
				
			});*/
	}
	else
	{
			JsonServiceList.save($scope.newListModel, function(response){
					if (response)
						{
						getList();
						$scope.taskInput = "";		
						}
					else {alert("error");}
					
					});	
	}
					
	
	
	
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
    if ($scope.hour.getHours()<=DueHour) {	
      if(confirm("Está seguro de querer borrar su pedido?")){        
		//JsonServiceListDeleteById.delete({'id': task})
		JsonServiceListDeleteById.delete({'id': task},function(response){
				if (response)
					{
					getList();
					}
				else {alert("error");}
			});				
        }      
    }else{
      getList();
    }
  };
  /*
   $scope.deleteMenu = function (menu) {
   alert(1);
    $scope.hour = new Date();	
      if(confirm("Está seguro de querer borrar el platillo?")){        
	  JsonServiceMenuDeleteById.delete({'id': menu});
		getMenu();		
        }        
  };
  */   
 /*
  $scope.checkTime = function (currentUser,listUser) {
    $scope.hour = new Date();
    if ($scope.hour.getHours()>=DueHour) {
      return false;
    }
	else{		
		if(currentUser==listUser)
			{
				return true;
			}
			else
			{
				return false;
			}		
		}    
  };
  */
/*
  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
    $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
      getTask();
    });
  };
*/
}])



app.controller('menuController', ['$scope','JsonServiceList', 'JsonServiceListDeleteById', 'JsonServiceMenu', 'JsonServiceMenuDeleteById','$filter', '$rootScope' , 'ValuesBetweenCtrl', function($scope, JsonServiceList,JsonServiceListDeleteById,JsonServiceMenu,JsonServiceMenuDeleteById, $filter, $rootScope, ValuesBetweenCtrl) {

	$scope.datamenu = {};
	getMenu();
	
	function getMenu(){   
    JsonServiceMenu.query(function(response) {
      $scope.datamenu.menu = response;
    });		
	};
	
  setInterval(function(){
    getMenu();
	
	//getMenu();
  },5000);
	
	  $scope.SelectMenu = function(menuname){	  
		ValuesBetweenCtrl.setValueObject(menuname);
		$rootScope.$broadcast('loadSelectedMenuItem');	
		};
		
   $scope.deleteMenu = function (menu) {
    $scope.hour = new Date();	
      if(confirm("Está seguro de querer borrar el platillo?")){        
	  JsonServiceMenuDeleteById.delete({'id': menu});			
				JsonServiceMenuDeleteById.delete({'id': menu},function(response){
				if (response)
					{
					getMenu();
					//alert(response);
					}
				else {alert("error");}
				
				});	
		getMenu();					
        }        
  };
  

}])

app.controller('DatepickerDemoCtrl', ['$scope', '$filter', '$rootScope', 'ValuesBetweenCtrl', function($scope, $filter,$rootScope, ValuesBetweenCtrl) {
	$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };
  
   $scope.dateChange = function () {
   var filterDateFormat= $filter('date')($scope.dt,'dd-MM-yyyy'); 
   ValuesBetweenCtrl.setValueString(filterDateFormat);  
	$rootScope.$broadcast('applyFilterByDate');	    	
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MM-yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

}])
 
app.controller('ModalCtrl', ['$scope','$modal', '$log','JsonServiceMenu', function($scope, $modal,$log,JsonServiceMenu) {

  $scope.newMenu={};
  $scope.newMenu.menuname="";
  $scope.newMenu.price="";
    
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        newMenu: function () {
          return $scope.newMenu;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {      
	  $scope.newMenu= selectedItem;
	  //alert($scope.newMenu.menuname);
	  JsonServiceMenu.save($scope.newMenu, function(response){
			if (response)
				{				
				JsonServiceMenu.query(function(response) {
				  $scope.datamenu.menu = response;
				  $scope.newMenu.menuname="";
				  $scope.newMenu.price="";
				});
				}
			else {alert("error");}
			
			});	
    }, function () {
      $log.info('Modal Cerrada el: ' + new Date());
    });
  };
}])

var ModalInstanceCtrl = function ($scope, $modalInstance, newMenu) {

  $scope.newMenu = newMenu;

  $scope.ok = function () {
    $modalInstance.close($scope.newMenu);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

})();
