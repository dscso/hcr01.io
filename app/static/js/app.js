var app = angular.module('app', [
  'ngRoute',
  'ngSanitize'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:url', {
        templateUrl: 'templates/template.html',
        controller: 'templateCtrl'
      }).otherwise({
        redirectTo: "/home"
      });
}]);

app.factory('routeNavigation', function($location) {
  var routes = settings.routes;
  return {
    routes: routes,
    activeRoute: function (route) {
      return route.path === $location.path();
    }
  };
});

app.directive('navigation', function (routeNavigation) {
    return {
        restrict: "E",
        templateUrl: "templates/navigation.html",
        controllerAs: "navCtrl",
        controller: function ($scope) {
           $scope.routes = routeNavigation.routes;
           $scope.activeRoute = routeNavigation.activeRoute;
        }
    };
});

app.controller('templateCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('md/' + $routeParams.url + '.md').success(function(data) {
      $scope.html = markdown.toHTML(data);
    }).error(function (err) {
      $scope.html = "<h2>404 - Not found</h2>";
    });
    $scope.url = $routeParams.url;
}]);
