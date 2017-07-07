angular.module('groupApp')
    .directive('topicItem', function (__env) {
        var templateUrl = __env.baseUrl + "/angularjs/group/templates/directives/topicItem.html";
        return {
            restrict: "E",
            templateUrl: templateUrl,
            scope: {
                topic: "="
            },
            controller: function ($scope, TopicData) {
                $scope.vote = function (value) {
                    $scope.topic.voted = value;
                    $scope.topic.vote = $scope.topic.vote + value;
                    TopicData.vote($scope.topic.id, value).then(
                        function (res) {
                            $scope.topic.voted = value;
                        }, function (err) {
                            console.log(err);
                        });
                };
            },
            link: function (scope, el, attrs) {
                scope.totalStudents = __env.totalStudents;
                scope.showDes = false;
                scope.toggleDescription = function () {
                    scope.showDes = !scope.showDes;
                };

            }
        }
    });
