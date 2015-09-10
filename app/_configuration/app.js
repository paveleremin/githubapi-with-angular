'use strict';

angular.module('app', [
    // vendors first
    'ngAnimate',
    'ui.router',

    // configuration modules
    'app.env',
    'app.configs',
    'app.resources',

    // application modules
    'app.UserList',
    'app.UserDetails',
    'app.RepoDetails',
])
;