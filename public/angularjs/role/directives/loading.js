roleApp.directive('loading', ['$rootScope', '$route', '__env', function ($rootScope, $route, __env) {
    var url = __env.baseUrl + "/angularjs/role/templates/directives/loading.html";
    return {
        restrict: 'E',
        templateUrl:url,
        link: function (scope, elem, attrs) {
            scope.isRouteLoading = true;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isRouteLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isRouteLoading = false;
            });
        }
    };
}]);