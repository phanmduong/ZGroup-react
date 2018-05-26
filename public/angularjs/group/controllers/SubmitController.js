/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp')
    .controller('SubmitController', ['$scope', '__env', '$stateParams', 'TopicData',

        function ($scope, __env, $stateParams, TopicData) {
            $scope.submitMessage = "";
            var createObjectURL = function (object) {
                return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
            };

            var revokeObjectURL = function (url) {
                return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url);
            };

            var index = 0;
            $scope.numfiles = 0;
            $scope.txtNumfiles = $scope.numfiles + " files selected";
            $scope.files = [];
            $scope.product = {};
            $scope.errorMessage = "";
            $scope.uploaded = 0;


            // GET THE FILE INFORMATION.
            $scope.getFileDetails = function (e) {
                var types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
                $scope.$apply(function () {
                    // STORE THE FILE OBJECT IN AN ARRAY.

                    for (var i = 0; i < e.files.length; i++) {
                        var typeIndex = types.indexOf(e.files[i].type);
                        console.log(typeIndex);
                        if (typeIndex != -1 && e.files[i].size < 100 * 1024 * 1024) {
                            var fileObj = {
                                index: index++,
                                data: e.files[i],
                                percent: 0,
                                uploading: 0
                            };
                            $scope.numfiles += 1;
                            $scope.txtNumfiles = $scope.numfiles + " files selected";

                            if (typeIndex <= 3) {
                                fileObj.url = createObjectURL(e.files[i]);
                            } else if (typeIndex == 4) {
                                fileObj.url = "http://i.imgur.com/fA20OHn.png";
                            } else if (typeIndex == 5) {
                                fileObj.url = 'http://i.imgur.com/D2MGQxb.png';
                            }

                            $scope.files.push(fileObj);
                        }
                    }
                });

            };


            $scope.removeFile = function (index) {
                $scope.files = $scope.files.filter(function (item) {
                    return item.index != index;
                });
                $scope.numfiles -= 1;
                $scope.txtNumfiles = $scope.numfiles + " files selected";
            };

            $scope.submit = function () {
                $scope.submitMessage = "Đang gửi bài. Bạn vui lòng chờ chút nhé...";
                $scope.errorMessage = '';
                $scope.submiting = true;
                if ($scope.product.title && $scope.product.description && $scope.files.length > 0) {

                    TopicData.saveProduct($scope.product, $stateParams.topicId)
                        .then(
                            function (res) {
                                $scope.product.id = res.data.id;
                                for (var i = 0; i < $scope.files.length; i++) {
                                    $scope.files[i].productId = $scope.product.id;
                                    $scope.uploadFile($scope.files[i]);
                                }

                            },
                            function (err) {
                                console.log(err);
                                $scope.submiting = false;
                            }
                        );

                } else {
                    $scope.errorMessage = "Bạn nhập thiếu thông tin hoặc bạn chưa thêm files để nộp";
                    $scope.submitMessage = "";
                    $scope.submiting = false;
                }


            };

            $scope.uploadFile = function (file) {
                file.uploading = true;
                file.message = "Uploading...";
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();

                // for (var i in $scope.files) {
                //     data.append("uploadedFile", $scope.files[i]);
                // }
                data.append('product_id', file.productId);
                data.append('index', file.index);
                data.append('_token', __env.token);

                // ADD LISTENERS.
                var objXhr = new XMLHttpRequest();
                objXhr.addEventListener("progress", function (e) {
                    var percent = (e.loaded / e.total) * 100;
                    file.percent = percent;
                    file.message = "Success";
                    $scope.$apply();
                }, false);
                objXhr.addEventListener("load", transferComplete, false);
                objXhr.addEventListener("error", errorHandler, false);
                var videos = ['video/mp4', 'video/quicktime'];
                var uploadUrl;
                if (videos.indexOf(file.data.type) >= 0) {
                    uploadUrl = __env.baseUrl + "/api/topic/" + $stateParams.topicId + "/videos";
                    data.append('video', file.data);

                } else {
                    uploadUrl = __env.baseUrl + "/api/topic/" + $stateParams.topicId + "/images";
                    data.append('image', file.data);
                }

                objXhr.open("POST", uploadUrl);
                // objXhr.setRequestHeader("Content-Type", "multipart/form-data");
                objXhr.send(data);
            };


            function errorHandler(event, data) {
                alert('Có lỗi');
            }

            $scope.resetForm = function () {
                $scope.submiting = false;
                $scope.product = {};
                $scope.files = [];
                $scope.submitMessage = "";
                $scope.submitted = false;
                $scope.numfiles = 0;
                $scope.txtNumfiles = $scope.numfiles + " files selected";
                $scope.uploaded = 0;
                index = 0;

            };
            // CONFIRMATION.
            function transferComplete() {
                console.log(this.responseText);
                $scope.uploaded += 1;
                if ($scope.uploaded == $scope.files.length) {
                    $scope.submitMessage = "Gửi bài thành công";
                    $scope.submitted = true;
                }
                $scope.$apply();
            }
        }]);