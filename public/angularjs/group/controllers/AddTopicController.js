/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('AddTopicController', function ($scope, __env, multipartForm, $state) {
        $scope.topic = {
            class_id: __env.classId
        };
        $scope.saving = false;
        $scope.save = function () {
            $scope.err = '';
            $scope.saving = true;
            $scope.message = "Saving...";
            var url = __env.baseUrl + "/api/topic";
            $scope.topic.deadline = $('#deadline').val();

            if ($scope.topic.description && $scope.topic.name && $scope.topic.deadline && $scope.topic.avatar) {
                multipartForm.post(url, $scope.topic)
                    .then(function (res) {
                        $scope.message = "Tạo topic thành công";
                        $('#deadline').val('');
                        $('#avatar').val('');
                        $scope.topic = {
                            class_id: __env.classId
                        };
                        $scope.error = "";
                        $scope.saving = false;
                        $state.go('topic', {topicId: res.data.id});
                    }, function (err) {
                        console.log(err);
                        $scope.saving = false;
                    })
            } else {
                $scope.message = '';
                $scope.error = 'Bạn điền thiếu thông tin';
                $scope.saving = false;
            }
        };
    });