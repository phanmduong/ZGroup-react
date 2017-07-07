/**
 * Created by caoanhquan on 2/26/16.
 */
angular.module('StudentApp')
.config(function ($routeProvider, baseURL) {
    $routeProvider
        .when('/links', {
            templateUrl: baseURL + 'templates/pages/links.html'
        })
        .when('/classes', {
            templateUrl: baseURL + 'templates/pages/classes.html',
            controller: 'DashboardCtrl'
        })
        .when('/', {
            redirectTo: '/classes'
        })
        .when('/lessons/:class_id',{
            templateUrl:baseURL + 'templates/pages/lessons.html',
            controller: 'LessonsCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
    ;
});