angular.module('groupApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            el.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, el[0].files[0]);
                })
            })
        }
    }
}]);