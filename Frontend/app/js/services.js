'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).value('version', '0.1');

angular.module('myApp.services', ['ngResource'])  
  .factory('AngularIssues', function($resource){
    return $resource('https://api.github.com/repos/angular/angular.js/issues', {});
	//return $resource('http://localhost:3000/user/', {})
  })
  .factory('JsonService', function($resource) {
   return $resource('http://192.168.0.123:3000/user/', {});
  })   
  .value('version', '0.1');