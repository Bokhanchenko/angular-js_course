'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'ngResource']);

phonecatApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'template/home.html',
        controller:'PhoneListCtrl'
      })
      .when('/about',{
        templateUrl:'template/about.html',
        controller:'AboutCtrl'
      })
      .when('/contact',{
        templateUrl:'template/contact.html',
        controller:'ContactCtrl'
      })
      .when('/phones/:phoneId', {
        templateUrl:'template/phone-detail.html',
        controller:'PhoneDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

/**Factory */
phonecatApp.factory('Phone', ['$resource', function ($resource) {
    return $resource('phones/:phoneId.:format', {
      phoneId: 'phones',
      //+@ для динамических параметров
      format: 'json',
      apiKey: 'someKeyThis',
      // http://localhost:8888/phones/phones.json?Key=someKeyThis
      },  {
        //action: {method: <?>, params: <?>, ...}
        update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
      });
    //Phone.update(params, successcb, errorcb);
  }
])

/* Filter */
phonecatApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

phonecatApp.controller('PhoneListCtrl',[
  '$scope','$http', '$location', 'Phone',
  function($scope, $http, $location, Phone) {

  //console.log('$location.url() - ', $location.url());
  //console.log('$location.path() - ', $location.path());
  //console.log('$location.search() - ', $location.search());
  //console.log('$location.hash() - ', $location.hash());

  // $http.get('phones/phones.json').success(function(data, status, headers, config) {
  //   $scope.phones = data;
  // });

  //вместо предведущей строки
  $scope.phones = Phone.query({phonesId:'phones'}, function (data) {
    $scope.phones = data;
  });

  //.query(params, successcb, errorcb)
  //.get(params, successcb, errorcb)
  //.save(params, payloadData, successcb, errorcb)
  //.delete(params, successcb, errorcb)

}]);
//About Controller
phonecatApp.controller('AboutCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

}]);

//Contact Controller payloadData,
phonecatApp.controller('ContactCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

}]);
//Phone Detail Controller
phonecatApp.controller('PhoneDetailCtrl',[
  '$scope','$http', '$location', '$routeParams', 'Phone',
  function($scope, $http, $location, $routeParams, Phone) {

  $scope.phoneId = $routeParams.phoneId;
  //var url = 'phones/'+$routeParams.phoneId+'.json';

  // $http.get(url).success(function(data) {
  //   $scope.phone = data;
  //   $scope.mainImageUrl = data.images[0];
  // });

  //вместо предведущего кода
  Phone.get({phoneId: $routeParams.phoneId}, function (data) {
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];
    //data.$save();   -сохранение парамера
  })

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }

}]);


