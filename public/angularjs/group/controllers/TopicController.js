/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('TopicController', ['$scope', 'topic', function ($scope, topic) {

        $scope.topic = topic.data;
        $scope.showDes = false;
        $scope.totalStudents = __env.totalStudents;
        $scope.toggleDescription = function () {
            $scope.showDes = !$scope.showDes;
        };

    }]);