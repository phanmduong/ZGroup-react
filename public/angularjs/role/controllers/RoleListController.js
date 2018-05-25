roleApp.controller('RoleListController', ['$scope', '$route', 'RoleData', function ($scope, $route, RoleData) {
    $scope.roles = $route.current.locals.roles.data;
    $scope.message = '';
    $scope.delete = function (roleId) {
        $scope.message = 'deleting...';
        RoleData.deleteRole(roleId).success(function (data, status) {
            $scope.message = '';
            var removeIndex = $scope.roles.map(function (item) {
                return item.id;
            }).indexOf(roleId);
            var length = $scope.roles.length;
            $scope.roles = $scope.roles.slice(0, removeIndex)
                .concat($scope.roles.slice(removeIndex + 1, length));
        });
    }
}]);