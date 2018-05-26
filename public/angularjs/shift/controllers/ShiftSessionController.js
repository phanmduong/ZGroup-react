shiftApp
    .controller('ShiftSessionController',
        ["$scope", "__env", "ShiftData", "shiftSessions",
            function ($scope, __env, ShiftData, shiftSessions) {

                $scope.shiftSessions = shiftSessions.data;
                $scope.changeActive = function (item) {
                    $scope.message = "Saving...";
                    ShiftData.editShiftSession(item)
                        .then(
                            function (res) {
                                $scope.message = 'Saved';
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                }
            }]);