/**
 * Created by caoanhquan on 2/26/16.
 */
angular.module('StudentApp')
    .controller('LessonsCtrl', ['$scope', '$http', 'baseURL', '$routeParams', function ($scope, $http, baseURL, $routeParams) {
        $scope.lessons = [{}];
        $http({
            method: 'GET',
            url: baseURL + 'student/lessons?class_id=' + $routeParams.class_id
        }).success(function (data) {
            $scope.lessons = data;
            console.log(data);
        });
    }])
    .controller('DashboardCtrl', function ($scope, $http, baseURL) {
        $scope.init = function (id, token) {
            $scope.studentId = id;
            $scope.student = {};
            $scope.classes = {};

            $http.post(
                baseURL + '/student/getcoursesregistered',
                {
                    _token: token,
                }).then(function (response) {
                console.log(response.status);
                console.log(response.data);
                $scope.classes = response.data;
            }, function (response) {
                console.log(response.data || "Request failed");
                console.log(response.status);
            });

            $http.post(
                baseURL + '/student/getstudentinfo',
                {
                    _token: token,
                    student_id: id
                }).then(function (response) {
                console.log(response.status);
                console.log(response.data);
                $scope.student = response.data;
            }, function (response) {
                console.log(response.data || "Request failed");
                console.log(response.status);
            });
        };
    });
