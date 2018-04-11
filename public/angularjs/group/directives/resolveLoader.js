angular.module('groupApp')
    .directive('resolveLoader', function ($rootScope, $timeout, __env) {
        var tmp = __env.baseUrl + "/angularjs/group/templates/directives/resolveLoader.html";
        return {
            restrict: 'E',
            templateUrl: tmp,
            link: function (scope, element) {
                scope.initLoad = true;
                scope.isStateLoading = true;
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    console.log('start');
                    // element.removeClass('ng-hide');
                    scope.isStateLoading = true;
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    console.log('success');
                    // element.addClass('ng-hide');
                    scope.isStateLoading = false;
                });
            }
        };
    });