'use strict';
roleApp.directive('staffRow', ['__env', function (__env) {
    var url = __env.baseUrl + "/angularjs/role/templates/directives/staffRow.html";
    return {
        restrict: 'A',
        templateUrl: url,
        replace: true,
        controller: function ($scope, StaffData) {
            $scope.message = '';
            $scope.deleteStaff = function (staffId) {
                $scope.message = "deleting...";
                StaffData.deleteStaff(staffId).success(function (data, status) {
                    var removeIndex = $scope.staffs.map(function (item) {
                        return item.id;
                    }).indexOf(staffId);
                    if (removeIndex > -1) {
                        $scope.staffs.splice(removeIndex, 1);
                        $scope.message = "";
                    }

                });
            };


            $scope.changeBase = function(staff){
                StaffData.changeBase(staff)
                    .success(function (data) {
                        Materialize.toast('Đổi cơ sở thành công', 2000);
                    });
            };

            $scope.changeRole = function (staff) {
                StaffData.changeRole(staff)
                    .success(function (data) {
                        Materialize.toast('Đổi chức vụ thành công', 2000);
                    });

            };
        }

    };
}]);
