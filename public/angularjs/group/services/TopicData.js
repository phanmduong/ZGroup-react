angular.module('groupApp')
    .factory('TopicData', ['$http', '__env', function ($http, __env) {
        return {
            getTopics: function (classId) {
                var url = __env.baseUrl + "/api/topics/" + classId;
                return $http({method: "GET", url: url});
            },
            saveProduct: function (product, topicId) {
                var url = __env.baseUrl + "/api/topic/" + topicId + "/product";
                return $http.post(url, product);
            },
            getTopic: function (topicId) {
                var url = __env.baseUrl + "/api/topic/" + topicId;
                return $http({method: "GET", url: url});
            },
            getClass: function () {
                var url = __env.baseUrl + "/api/class/" + __env.classId;
                return $http({method: "GET", url: url});
            },
            getStudents: function () {
                var url = __env.baseUrl + "/api/class/" + __env.classId + "/students";
                return $http({method: "GET", url: url});
            },
            vote: function (topicId, value) {
                if (value == 1) {
                    var url = __env.baseUrl + "/api/topic/" + topicId + "/upvote";
                } else {
                    var url = __env.baseUrl + "/api/topic/" + topicId + "/downvote";
                }
                return $http({method: "GET", url: url});

            }
            // getRole: function (roleId) {
            //     var url = __env.baseUrl + "/api/roles/" + roleId;
            //     return $http({method: 'GET', url: url});
            // },
            // saveRole: function (data) {
            //     return $http.post(__env.baseUrl + "/api/roles", data);
            // },
            // deleteRole: function (id) {
            //     return $http.delete(__env.baseUrl + '/api/roles/' + id);
            // }
        }
    }]);