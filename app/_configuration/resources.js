'use strict';

angular.module('app.resources', ['ngResource'])
    .service('userApi', function ($resource, env){
        var url = env.apiBase+'users/:userLogin/';
        return $resource(url, {}, {
            repos: {
                url: url+'repos',
                isArray: true
            }
        });
    })
    .service('repoApi', function ($resource, env){
        var url = env.apiBase+'repos/:userLogin/:repoName/';
        return $resource(url, {}, {
            commits: {
                url: url+'commits',
                isArray: true
            },
            branches: {
                url: url+'branches',
                isArray: true
            }
        });
    })
;
