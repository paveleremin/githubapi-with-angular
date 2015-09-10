'use strict';

(function (angular){

    var Ctrl = function ($rootScope, $state, users) {

        var ctrl = this;
        ctrl.users = users;

    };

    Ctrl.resolve = {
        /*@ngInject*/
        users: function ($q, userApi){
            return $q(function (resolve){
                userApi.query(function (users){
                    resolve(users);
                });
            });
        }
    };

    // INIT MODULE
    var module = angular.module('app.UserList', []);

    // INIT CONTROLLER
    module.controller('UserList', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('user-list', {
            url: '/users',
            templateUrl: 'user-list/user-list.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);