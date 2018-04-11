regisShiftApp
    .controller('ShiftPickController',
        ["$scope", "__env", 'data', 'ShiftData',
            function ($scope, __env, data, ShiftData) {
                $scope.shiftPicks = data.data.shift_picks;
                $scope.loadingText = "Load more";
                $scope.isLoading = false;
                var page = 1;
                $scope.loadMore = function () {
                    $scope.isLoading = true;
                    $scope.loadingText = "Loading";
                    page += 1;
                    ShiftData.getShiftPicks(page)
                        .then(function (res) {
                            var shift_picks = res.data.shift_picks;
                            for (var i = 0; i < shift_picks.length; i++) {
                                $scope.shiftPicks.push(shift_picks[i]);
                            }
                            $scope.isLoading = false;
                            $scope.loadingText = "Load more";
                        }, function (err) {
                            console.log(err);
                        })
                }
            }]);