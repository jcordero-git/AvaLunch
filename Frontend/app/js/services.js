'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).value('version', '0.1');

var urlServer="http://localhost:port";

angular.module('myApp.services', ['ngResource','ngCookies'])
  
  
  
  /*
.config(['flowFactoryProvider',  function (flowFactoryProvider) {
  
  
  flowFactoryProvider.defaults = {
    target: 'http://localhost:3000/upload',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4,
	
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
 
 
  
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}])
 */
  
  .config(function($routeProvider,
  $httpProvider){
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
  
  .factory('AngularIssues', function($resource){
    return $resource('https://api.github.com/repos/angular/angular.js/issues', {});
	//return $resource('http://localhost:3000/user/', {})
  })
  
    .factory('GetServerHour', function($resource) {
   return $resource(urlServer+'/serverHour/', 
	{
	port: ':3000'
	},
	{
	query: {method:'GET', isArray: false}
	}
   );
  })
  
 
  
   .factory('UpdateService', function($resource) {
   return $resource(urlServer+'/upload/', 
	{
	port: ':3000'
	}
   );
  })
  
   .factory('getUserImgService', function($resource) {
   return $resource(urlServer+'/getuserimg/', 
	{
	port: ':3000'
	}
   );
  })
  
  
  .factory('JsonService', function($resource) {
   return $resource(urlServer+'/user/', 
	{
	port: ':3000'
	}
   );
  }) 
  
  .factory('JsonServiceUpdateUser', function($resource) {
   return $resource(urlServer+'/user/:id/:updatePass',
		{
		port: ':3000'
		},
		{
	   update: {method:'PUT', params: {entryId: '@id', updatePas: '@updatePass'}}
	   }
	   );
   })
  
  
    .factory('JsonServiceList', function($resource) {
   return $resource(urlServer+'/list/', 
	{
	port: ':3000'
	}
   );
  })
  
  .factory('JsonServiceListByDate', function($resource) {
   return $resource(urlServer+'/list/:date', 
	{
	port: ':3000'
	}
   );
  })

   .factory('JsonServiceListDeleteById', function($resource){
  return $resource(urlServer+'/list/:id',
	{
	port: ':3000',
	id:'@id'
	},
	{}
  );
  })
  
  .factory('JsonServiceMenu', function($resource) {
   return $resource(urlServer+'/menu/', 
	{
	port: ':3000'
	}
   );
  }) 
  
    .factory('JsonServiceMenuDeleteById', function($resource){
  return $resource(urlServer+'/menu/:id',
	{
	port: ':3000',
	id:'@id'
	},
	{}
  );
  })
  
   .factory('JsonServiceMenuFindByName', function($resource){
  return $resource(urlServer+'/menu/:menuname',
	{
	port: ':3000',
	id:'@id'
	}
  );
  })
  
  .factory('ValidateUser', function($resource){
  return $resource(urlServer+'/user/:username/:password',
	{
	port: ':3000',
	username:'@username',
	password:'@password'
	},
	{}
  );
  })
  
   .factory('SendEmailNotification', function($resource){
  return $resource(urlServer+'/sendemail/:listuser/:caller/:date',
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
  return $resource(urlServer+'/user/:email',
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