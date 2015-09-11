'use strict';

(function (angular){

    var Ctrl = function (initData) {

        var ctrl = this;
        ctrl.user = initData.user;
        ctrl.repo = initData.repo;
        ctrl.commits = initData.commits;
        ctrl.branches = initData.branches;

    };

    Ctrl.resolve = {
        /*@ngInject*/
        initData: function ($rootScope, $stateParams, $q, userApi, repoApi){
            var d = $q.defer(),
                user = $q.defer(),
                repo = $q.defer(),
                commits = repoApi.commits($stateParams),
                branches = repoApi.branches($stateParams);

            // save two api calls and clear $rootScope
            if ($rootScope.repo || $rootScope.user) {
                repo.resolve($rootScope.repo);
                repo.$promise = repo.promise;
                delete $rootScope.repo;

                user.resolve($rootScope.user);
                user.$promise = user.promise;
                delete $rootScope.user;
            }
            else {
                repo = repoApi.get($stateParams);
                user = userApi.get({userLogin: $stateParams.userLogin});
            }

            $q.all([
                user.$promise,
                repo.$promise,
                commits.$promise,
                branches.$promise
            ]).then(function (data){
                d.resolve({
                    user: data[0],
                    repo: data[1],
                    commits: data[2],
                    branches: data[3]
                });
            });

            return d.promise;
        }
    };

    // INIT MODULE
    var module = angular.module('app.RepoDetails', []);

    // INIT CONTROLLER
    module.controller('RepoDetails', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('repo-details', {
            url: '/repos/:userLogin/:repoName',
            templateUrl: 'repo-details/repo-details.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);
