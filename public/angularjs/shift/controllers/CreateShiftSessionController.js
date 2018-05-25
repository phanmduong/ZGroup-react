shiftApp
    .controller('CreateShiftSessionController',
        ["$scope", "__env", "ShiftData",
            function ($scope, __env, ShiftData) {
                $scope.shiftSession = {
                    start_time: "",
                    end_time: "",
                    name: ""
                };
                $scope.save = function () {
                    $scope.message = "Saving...";
                    ShiftData.createShiftSession($scope.shiftSession)
                        .then(
                            function (res) {
                                $scope.message = "Đã tạo ca trực từ " + res.data.start_time + " đến " + res.data.end_time;
                            }
                            ,
                            function (err) {
                                console.log(err);
                            }
                        )
                    ;
                }
            }]);