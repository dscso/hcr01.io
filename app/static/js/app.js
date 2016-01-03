var app = angular.module('app', [
  'ngRoute',
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        name : "home",
      }).when('/about', {
        templateUrl: 'templates/about.html',
        name : "about",
      })
      .otherwise({
        redirectTo: "/"
      });
}]);

app.factory('routeNavigation', function($route, $location) {
  var routes = [];
  angular.forEach($route.routes, function (route, path) {
    if (route.name) { // if name is given show it in the menu
      routes.push({
        path: path,
        name: route.name
      });
    }
  });
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
