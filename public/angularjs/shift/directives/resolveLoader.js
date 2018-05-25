shiftApp
    .directive('resolveLoader', function ($rootScope, $timeout, __env) {
        var tmp = __env.baseUrl + "/angularjs/shift/templates/directives/resolveLoader.html";
        return {
            restrict: 'E',
            templateUrl: tmp,
            link: function (scope, element) {
                scope.isStateLoading = true;
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    scope.isStateLoading = true;
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    scope.isStateLoading = false;
                });
            }
        };
    });
