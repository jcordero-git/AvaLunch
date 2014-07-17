'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).value('version', '0.1');

var ipServer="192.168.49.82";

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
  
    .factory('JsonServiceList', function($resource) {
   return $resource('http://'+ipServer+':port/list/', 
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
	  
	  var setValueString = function(value){
	  valueString = value;	  
	  }  
	  
	  var getvalueString = function(){	    
	  return valueString;
	  }	  
	  return{
	  setValueString: setValueString,
	  getvalueString: getvalueString
	  };	  	  
})
  
  .service('loggedInStatus', function($cookieStore){
	  var username="";
	  var loggedIn=false;
			  
	  var setUsername = function(usernameParam){
	  username = usernameParam;	  
	  $cookieStore.put('loggedUser', username);
	  }  
	  
	  var getUsername = function(){	  
	  username = $cookieStore.get('loggedUser');  
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
	  setUsername: setUsername,
	  getUsername: getUsername,
	  setLoggedIn: setLoggedIn,
	  getLoggedIn: getLoggedIn
	  };
	  	  
})
  .value('version', '0.1');