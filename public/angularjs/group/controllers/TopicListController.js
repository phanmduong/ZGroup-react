/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('TopicListController', ['TopicData', 'topics', '$scope', '__env',
        function (TopicData, topics, $scope, __env) {
            $scope.topics = topics.data;
            $scope.isStaff = __env.role > 0;
        }]);