/**
 * Created by caoanhquan on 2/26/16.
 */
angular.module('StudentApp').factory('UserService', function() {
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
    return {
        name : 'anonymous'
    };
});

