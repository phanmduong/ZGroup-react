shiftApp
    .controller('EditShiftSessionController',
        ["$scope", "__env", "shiftSession", "ShiftData",
            function ($scope, __env, shiftSession, ShiftData) {
                $scope.shiftSession = shiftSession.data;
                $scope.save = function () {
                    $scope.message = "Saving...";
                    ShiftData.editShiftSession($scope.shiftSession)
                        .then(
                            function (res) {
                                $scope.message = "Đã sửa ca trực từ " + res.data.start_time + " đến " + res.data.end_time;
                            }
                            ,
                            function (err) {
                                console.log(err);
                            }
                        )
                    ;
                }
            }]);