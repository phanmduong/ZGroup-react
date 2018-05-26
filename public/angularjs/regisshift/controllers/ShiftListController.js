regisShiftApp
    .controller('ShiftListController',
        ["$scope", "__env", 'ShiftData', 'socket', 'bases',
            function ($scope, __env, ShiftData, socket, bases) {
                $scope.bases = bases.data;
                $scope.user_id = __env.user_id;
                $scope.gens = __env.gens;
                $scope.current_gen_id = __env.current_gen_id + "";
                $scope.isChangingGen = false;
                $scope.current_base_id = $scope.bases[0].id + "";

                $scope.onChangeBase = function () {
                    $scope.isChangingGen = true;
                    ShiftData.getCurrentShifts($scope.current_gen_id, $scope.current_base_id)
                        .then(
                            function (res) {
                                $scope.isChangingGen = false;
                                $scope.weeks = res.data.weeks;
                            },
                            function (err) {
                                console.log(err);
                                $scope.isChangingGen = false;
                            }
                        );
                };
                $scope.onChangeBase();

                $scope.onChangeGen = function () {
                    $scope.isChangingGen = true;
                    ShiftData.getCurrentShifts($scope.current_gen_id, $scope.current_base_id)
                        .then(
                            function (res) {
                                $scope.isChangingGen = false;
                                $scope.weeks = res.data.weeks;
                            },
                            function (err) {
                                console.log(err);
                                $scope.isChangingGen = false;
                            }
                        );

                };

                function updateShifts(weeks, shift) {
                    for (var e = 0; e < weeks.length; e++) {
                        var dates = weeks[e].dates;
                        for (var i = 0; i < dates.length; i++) {
                            var array = $.map(dates[i].shifts, function (value, index) {
                                return [value];
                            });
                            for (var j = 0; j < array.length; j++) {
                                if (array[j].id == shift.id) {
                                    array[j].user = shift.user;
                                    // console.log(array[j]);
                                }

                            }
                        }
                    }
                }

                socket.on("colorme-channel:regis-shift", function (data) {
                    var shift = JSON.parse(data);
                    updateShifts($scope.weeks, shift);
                });


                socket.on("colorme-channel:remove-shift", function (data) {
                    var shift = JSON.parse(data);
                    updateShifts($scope.weeks, shift);
                });

                $scope.removeShift = function (shift) {
                    if (!shift.removing) {
                        shift.removing = true;
                        shift.regisMessage = "Đang huỷ đăng kí...";
                        ShiftData.removeShift(shift)
                            .then(
                                function (res) {
                                    shift.user = null;
                                    shift.regisMessage = "";
                                    shift.removing = false;
                                    Materialize.toast(res.data.message, 4000)
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );
                    }

                };

                $scope.regisShift = function (shift) {
                    if (!shift.registering) {
                        shift.registering = true;
                        shift.regisMessage = "Đang đăng kí...";
                        ShiftData.registerShift(shift.id)
                            .then(
                                function (res) {
                                    if (res.data.status == 1) {
                                        shift.user = res.data.user;
                                    }
                                    shift.regisMessage = "";
                                    shift.registering = false;
                                    Materialize.toast(res.data.message, 4000)
                                },
                                function (err) {
                                    console.log(err.data);
                                }
                            );
                    }

                }


            }]);