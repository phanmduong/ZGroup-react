'use strict';

roleApp.controller("StaffListController", ['$scope', 'StaffData', '$route', '$timeout',
    function ($scope, StaffData, $route, $timeout) {
        $scope.staffs = $route.current.locals.staffs.data.map(staff => {
            staff['base_id'] = staff.base_id + "";
            return staff;
    });
        $scope.roles = $route.current.locals.roles.data;
        $scope.bases = $route.current.locals.bases.data;
        $scope.canDelete = true;
        // pagination
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.pages = [];

        $scope.numberOfPages = function () {
            return Math.ceil($scope.staffs.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.numberOfPages(); i++) {
            $scope.pages.push(i);
        }

        $scope.setPage = function (page) {
            $scope.curPage = page;
        };
        $scope.nextPage = function () {
            console.log($scope.staffs.length);
            if ($scope.curPage < $scope.staffs.length / $scope.pageSize - 1) {
                $scope.curPage += 1;
            }
        };
        $scope.previousPage = function () {
            if ($scope.curPage > 0) {
                $scope.curPage -= 1;
            }
        }

    }]);