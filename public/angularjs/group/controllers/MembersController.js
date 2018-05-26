/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('MembersController', ['members', '$scope', function (members, $scope) {
        $scope.members = members.data;
    }]);