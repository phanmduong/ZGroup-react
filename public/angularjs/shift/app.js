var shiftApp = angular.module('shiftApp', ['ui.router'])
    .constant('__env', __env)
    .config(['$stateProvider', '$urlRouterProvider', "__env", '$interpolateProvider',
        function ($stateProvider, $urlRouterProvider,
                  __env, $interpolateProvider) {
            $urlRouterProvider.otherwise('/shiftsession');
            $interpolateProvider
                .startSymbol("[[")
                .endSymbol("]]");
            var baseTemplateUrl = __env.baseUrl + "/angularjs/shift/templates/";

            $stateProvider
                .state('shiftSessions', {
                    url: '/shiftsession',
                    templateUrl: baseTemplateUrl + "shiftSession.html",
                    controller: "ShiftSessionController",
                    resolve: {
                        shiftSessions: function (ShiftData) {
                            return ShiftData.getShiftSessions();
                        }
                    }
                })
                .state('createShiftSession', {
                    templateUrl: baseTemplateUrl + "createShiftSession.html",
                    controller: "CreateShiftSessionController",
                    url: '/create-shift-session'
                })
                .state('shiftSession', {
                    url: '/shiftsession/:id',
                    templateUrl: baseTemplateUrl + 'createShiftSession.html',
                    controller: "EditShiftSessionController",
                    resolve: {
                        shiftSession: function (ShiftData, $stateParams) {
                            return ShiftData.getShiftSession($stateParams.id);
                        }
                    }
                })
        }]);