'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).value('version', '0.1');

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
   return $resource('http://192.168.0.124:port/user/', 
	{
	port: ':3000'
	}
   );
  }) 
  
    .factory('JsonServiceList', function($resource) {
   return $resource('http://192.168.0.124:port/list/', 
	{
	port: ':3000'
	}
   );
  })

   .factory('JsonServiceListDeleteById', function($resource){
  return $resource('http://192.168.0.124:port/list/:id',
	{
	port: ':3000',
	id:'@id'
	},
	{}
  );
  })
  
  
  .factory('JsonServiceMenu', function($resource) {
   return $resource('http://192.168.0.124:port/menu/', 
	{
	port: ':3000'
	}
   );
  }) 
  
  .factory('ValidateUser', function($resource){
  return $resource('http://192.168.0.124:port/user/:username/:password',
	{
	port: ':3000',
	username:'@username',
	password:'@password'
	},
	{}
  );
  })
  
    .factory('ForgotPassword', function($resource){
  return $resource('http://192.168.0.124:port/user/:email',
	{
	port: ':3000',
	email:'@email'
	},
	{}
  );
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