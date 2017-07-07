angular.module('groupApp')
    .directive('uploadItem', function (__env) {
        var templateUrl = __env.baseUrl + "/angularjs/group/templates/directives/uploadItem.html";
        return {
            restrict: "E",
            templateUrl: templateUrl,
            scope: {
                file: "=",
                removeFile: "&",
                submiting: "="
            },
            link: function (scope, el, attrs) {
            }
        }
    });
