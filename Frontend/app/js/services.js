'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).value('version', '0.1');

var ipServer="localhost";

angular.module('myApp.services', ['ngResource','ngCookies'])
  .config(function($routeProvider,
  $httpProvider){
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
  
  .factory('AngularIssues', function($resource){
    return $resource('https://api.github.com/repos/angular/angular.js/issues', {});
	//return $resource('http://localhost:3000/user/', {})
  })
  
  .factory('JsonService', function($resource) {
   return $resource('http://'+ipServer+':port/user/', 
	{
	port: ':3000'
	}
   );
  }) 
  /*
   .factory('JsonServiceUpdateUser', function($resource) {
   return $resource('http://'+ipServer+':port/user/', 
	{
	port: ':3000'
	
	}
   );
  })
  */
  
  .factory('JsonServiceUpdateUser', function($resource) {
   return $resource('http://'+ipServer+':port/user/:id',{port: ':3000'},{
	   update: {method:'PUT', params: {entryId: '@id'}}
	   }
	   );
   })
  
  
    .factory('JsonServiceList', function($resource) {
   return $resource('http://'+ipServer+':port/list/', 
	{
	port: ':3000'
	}
   );
  })
  
  .factory('JsonServiceListByDate', function($resource) {
   return $resource('http://'+ipServer+':port/list/:date', 
	{
	port: ':3000'
	}
   );
  })

   .factory('JsonServiceListDeleteById', function($resource){
  return $resource('http://'+ipServer+':port/list/:id',
	{
	port: ':3000',
	id:'@id'
	},
	{}
  );
  })
  
  .factory('JsonServiceMenu', function($resource) {
   return $resource('http://'+ipServer+':port/menu/', 
	{
	port: ':3000'
	}
   );
  }) 
  
    .factory('JsonServiceMenuDeleteById', function($resource){
  return $resource('http://'+ipServer+':port/menu/:id',
	{
	port: ':3000',
	id:'@id'
	},
	{}
  );
  })
  
   .factory('JsonServiceMenuFindByName', function($resource){
  return $resource('http://'+ipServer+':port/menu/:menuname',
	{
	port: ':3000',
	id:'@id'
	}
  );
  })
  
  .factory('ValidateUser', function($resource){
  return $resource('http://'+ipServer+':port/user/:username/:password',
	{
	port: ':3000',
	username:'@username',
	password:'@password'
	},
	{}
  );
  })
  
   .factory('SendEmailNotification', function($resource){
  return $resource('http://'+ipServer+':port/sendemail/:listuser/:caller/:date',
	{
	port: ':3000',
	listuser:'@listuser',
	caller: '@caller',
	date: '@date'
	},
	{}
  );
  })
  
    .factory('ForgotPassword', function($resource){
  return $resource('http://'+ipServer+':port/user/:email',
	{
	port: ':3000',
	email:'@email'
	},
	{}
  );
  })

  .service('ValuesBetweenCtrl', function(){
	  var valueString="";
	  var valueObject={};
	  var menu={};
	  var list={};
	  
	  var setValueString = function(value){
	  valueString = value;	  
	  }  
	  
	  var getvalueString = function(){	    
	  return valueString;
	  }	 

	  var setValueObject = function(value){
	  valueObject = value;	  
	  }  
	  
	  var getvalueObject = function(){	    
	  return valueObject;
	  }	
	  
	  var setMenu = function(value){
	  menu = value;	  
	  }  
	  
	  var getMenu = function(){	    
	  return menu;
	  }	
	  var setList = function(value){
	  list = value;	  
	  }  
	  
	  var getList = function(){	    
	  return list;
	  }	
		
	  return{
	  setValueString: setValueString,
	  getvalueString: getvalueString,
	  setValueObject: setValueObject,
	  getvalueObject: getvalueObject,
	  setMenu: setMenu,
	  getMenu: getMenu,
	  setList: setList,
	  getList: getList
	  };	  	  
})
  
  .service('loggedInStatus', function($cookieStore){
	  
	  var user={};
	  var username="";
	  var loggedIn=false;

	  var setUser = function(userParam){
	  user = userParam;	  
	  $cookieStore.put('loggedUser', user);
	  }  
	  
	  var getUser = function(){	  
	  user = $cookieStore.get('loggedUser');  
	  return user;
	  }
		
	  var setUsername = function(usernameParam){
	  username = usernameParam;	  
	  //$cookieStore.put('loggedUser', username);
	  }  
	  
	  var getUsername = function(){	  
	 // username = $cookieStore.get('loggedUser');  
	  return username;
	  }
	  
	  var setLoggedIn = function(status){
	  loggedIn = $cookieStore.put('loggedin', status);	  
	  }  
	 	  
	  var getLoggedIn = function(){
	  loggedIn = $cookieStore.get('loggedin');
	  return loggedIn;
	  }
	  
	  return{
	  setUser: setUser,
	  getUser: getUser,
	  setUsername: setUsername,
	  getUsername: getUsername,
	  setLoggedIn: setLoggedIn,
	  getLoggedIn: getLoggedIn
	  };
	  	  
})
  
  .value('version', '0.1');