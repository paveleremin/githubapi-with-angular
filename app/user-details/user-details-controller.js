'use strict';

(function (angular){

    var Ctrl = function ($rootScope, $state, initData) {

        var ctrl = this;
        ctrl.user = initData.user;
        ctrl.repos = initData.repos;

        ctrl.repoCommits = function (repo){
            // save two api call when navigate deeper
            // why two? because repo.owher does not contain 'name'
            $rootScope.repo = repo;
            $rootScope.user = ctrl.user;
            $state.transitionTo('repo-details', {
                userLogin: ctrl.user.login, repoName: repo.name
            });
        };
    };

    Ctrl.resolve = {
        /*@ngInject*/
        initData: function ($rootScope, $q, $stateParams, userApi){

            var d = $q.defer(),
                user = userApi.get($stateParams),
                repos = userApi.repos($stateParams);

            $q.all([
                user.$promise,
                repos.$promise
            ]).then(function (data){
                d.resolve({
                    user: data[0],
                    repos: data[1]
                });
            });

            return d.promise;
        }
    };

    // INIT MODULE
    var module = angular.module('app.UserDetails', []);

    // INIT CONTROLLER
    module.controller('UserDetails', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('user-details', {
            url: '/users/:userLogin',
            templateUrl: 'user-details/user-details.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);