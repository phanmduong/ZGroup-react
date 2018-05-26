'use strict';

roleApp.controller("AddStaffController", ['$scope','StaffData', '$route', 
	function ($scope,StaffData,$route) {
		$scope.roles = $route.current.locals.roles.data;
		$scope.error = "";
		$scope.search = "";
		$scope.staffs = [];
		$scope.message = '';
		$scope.searchUser = function(){
			$scope.error='';
			if ($scope.search.length >= 3){
				$scope.message = 'Seaching...';
				StaffData.searchUser($scope.search)
				.success(function(data){
					$scope.staffs = data;
					if ($scope.staffs.length == 0){
						$scope.error = 'Không tìm thấy người dùng nào';	
					}
					$scope.message = $scope.staffs.length + ' kết quả';	
				});	
			}else{
				$scope.error = "Bạn cần nhập ít nhất 3 ký tự vào ô tìm kiếm";
			}
			
		};
	}]);
