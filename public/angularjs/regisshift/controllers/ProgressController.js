regisShiftApp
    .controller('ProgressController',
        ["$scope", "__env", 'data', 'ShiftData',
            function ($scope, __env, data, ShiftData) {
                $scope.weeks = data.data;
                $scope.gens = __env.gens;
                $scope.current_gen_id = __env.current_gen_id + "";
                $scope.isChangingGen = false;

                $scope.onChangeGen = function () {
                    $scope.isChangingGen = true;
                    ShiftData.getProgress($scope.current_gen_id)
                        .then(
                            function (res) {
                                $scope.isChangingGen = false;
                                $scope.weeks = res.data;
                            },
                            function (err) {
                                console.log(err);
                                $scope.isChangingGen = false;
                            }
                        );

                };
            }]);