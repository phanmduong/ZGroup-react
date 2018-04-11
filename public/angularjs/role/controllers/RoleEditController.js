roleApp.controller('RoleEditController', ['$scope', 'RoleData', '$route', function ($scope, RoleData, $route) {
    $('.collapsible').collapsible();
    var isCreate = true;
    var message = "";
    if ($route.current.locals.data) {
        $scope.role = $route.current.locals.data.data.role;
        $scope.tabs = $route.current.locals.data.data.tabs;
        isCreate = false;
        message = "Cập nhật thành công";
    } else {
        $scope.role = {id: -1};
        $scope.tabs = $route.current.locals.tabs.data;
        message = "Tạo mới thành công";
    }


    $scope.parentTabs = $scope.tabs.filter(function (tab) {
        return tab.url == "#";
    }).map(function (tab) {
        tab.tabs = $scope.tabs.filter(function (e) {
            return e.parent_id == tab.id;
        });
        return tab
    });
    // console.log($scope.parentTabs);
    $scope.submitRole = function () {
        $scope.message = "Đang xử lý";
        $scope.tabs = [];
        for (var i = 0; i < $scope.parentTabs.length; i++) {
            $scope.tabs.push($scope.parentTabs[i]);
            for (var j = 0; j < $scope.parentTabs[i].tabs.length; j++) {
                $scope.tabs.push($scope.parentTabs[i].tabs[j]);
            }
        }
        var data = JSON.stringify({
            role: $scope.role,
            tabs: $scope.tabs
        });
        RoleData.saveRole(data).success(function (data, status) {
            // console.log(data);
            $scope.message = message;
            if (isCreate) {
                $scope.role = {};
                $scope.tabs.map(function (tab) {
                    tab.checked = false;
                });
            }

        });
    };
    $scope.checkAll = function (parentTab) {
        angular.forEach(parentTab.tabs, function (tab) {
            tab.checked = parentTab.checked;
        });
    };
}]);