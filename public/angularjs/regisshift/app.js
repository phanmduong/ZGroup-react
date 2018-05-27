var regisShiftApp = angular.module('regisShiftApp', ['ui.router'])
    .constant('__env', __env)
    .config(['$stateProvider', '$urlRouterProvider', "__env", '$interpolateProvider',
        function ($stateProvider, $urlRouterProvider,
                  __env, $interpolateProvider) {
            $urlRouterProvider.otherwise('/shifts');
            $interpolateProvider
                .startSymbol("[[")
                .endSymbol("]]");
            var baseTemplateUrl = __env.baseUrl + "/angularjs/regisshift/templates/";

            $stateProvider
                .state('shifts', {
                    url: '/shifts',
                    templateUrl: baseTemplateUrl + "shifts.html",
                    controller: "ShiftListController",
                    resolve: {
                        bases: function (ShiftData) {
                            return ShiftData.getBases();
                        }
                    }
                })
                .state('progress', {
                    url: '/progress',
                    templateUrl: baseTemplateUrl + "progress.html",
                    controller: 'ProgressController',
                    resolve: {
                        data: function (ShiftData) {
                            return ShiftData.getProgress();
                        }
                    }
                })
                .state('shift-picks', {
                    url: '/shift-picks',
                    templateUrl: baseTemplateUrl + "shiftPicks.html",
                    controller: 'ShiftPickController',
                    resolve: {
                        data: function (ShiftData) {
                            return ShiftData.getShiftPicks();
                        }
                    }
                });


        }]);