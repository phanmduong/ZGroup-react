roleApp.directive('deleteBtn', function(__env){
    var url = __env.baseUrl + "/angularjs/role/templates/directives/deleteBtn.html";
    return {
        restrict: 'E',
        templateUrl: url,
        scope:{
            notifyParent:"&method",
            message:"=deleteMessage"
        },
        controller: function($scope){
            $scope.deleting=false;
            $scope.removing = false;
            $scope.startRemove = function() {
                $scope.removing = true;
            };
            $scope.cancelRemove = function() {
                $scope.removing = false;
            };
            $scope.confirmRemove = function() {
                $scope.deleting = true;
                $scope.notifyParent();
            };
      }
  };
});