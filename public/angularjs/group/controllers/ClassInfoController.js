/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('ClassInfoController', ['studyClass', '$scope', function (studyClass, $scope) {
        $scope.studyClass = studyClass.data;
    }]);