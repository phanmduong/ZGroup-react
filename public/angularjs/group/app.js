/**
 * Created by caoanhquan on 7/12/16.
 */
angular.module('groupApp', ['ui.router', 'datePicker'])
    .constant('__env', __env)
    .config(["$stateProvider", "$urlRouterProvider", "__env", '$interpolateProvider',
        function ($stateProvider, $urlRouterProvider, __env, $interpolateProvider) {

            $urlRouterProvider.otherwise('/');
            $interpolateProvider
                .startSymbol("[[")
                .endSymbol("]]");
            var baseTemplateUrl = __env.baseUrl + "/angularjs/group/templates/";
            $stateProvider
                .state('topicList', {
                    url: '/',
                    templateUrl: baseTemplateUrl + "topicList.html",
                    controller: "TopicListController",
                    resolve: {
                        topics: function (TopicData, __env) {
                            return TopicData.getTopics(__env.classId);
                        }
                    }
                })
                .state('classInfo', {
                    url: '/classInfo',
                    templateUrl: baseTemplateUrl + "classInfo.html",
                    controller: "ClassInfoController",
                    resolve: {
                        studyClass: function (TopicData) {
                            return TopicData.getClass();
                        }
                    }
                })
                .state('members', {
                    url: '/members',
                    templateUrl: baseTemplateUrl + 'members.html',
                    controller: 'MembersController',
                    resolve: {
                        members: function (TopicData) {
                            return TopicData.getStudents();
                        }
                    }
                })
                .state('addTopic', {
                    url: '/add-topic',
                    templateUrl: baseTemplateUrl + 'addTopic.html',
                    controller: 'AddTopicController',
                    controllerAs: 'vm'
                })
                .state('submit', {
                    url: '/submit/:topicId',
                    templateUrl: baseTemplateUrl + 'submit.html',
                    controller: 'SubmitController',
                    controllerAs: 'vm'
                })
                .state('topic', {
                    url: '/topic/:topicId',
                    templateUrl: baseTemplateUrl + 'topic.html',
                    controller: "TopicController",
                    resolve: {
                        topic: function (TopicData, $stateParams) {
                            return TopicData.getTopic($stateParams.topicId);
                        }
                    }
                });


        }]);