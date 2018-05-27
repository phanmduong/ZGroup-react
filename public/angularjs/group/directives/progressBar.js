angular.module('groupApp').directive('progressBar', function () {
    var templateUrl = __env.baseUrl + "/angularjs/group/templates/directives/progressBar.html";
    return {
        restrict: 'E',
        scope: {
            progress: "="
        },
        templateUrl: templateUrl,
        link: function (scope, el, attrs) {

        }
    }
});