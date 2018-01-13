(function () {
    'use strict';
    angular
        .module('app', [
            'ui.router'])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('/home', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: 'pages/home.html',
                controllerAs: 'vm'
            })
            .state('/home.login', {
                url: '/login',
                templateUrl: 'pages/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('/home.videos', {
                url: '/videos/:sessionId',
                templateUrl: 'pages/videos.html',
                controller: 'VideosController',
                controllerAs: 'vm'
            })
            .state('/home.video', {
                url: '/video/:videoId/:sessionId',
                templateUrl: 'pages/video.html',
                controller: 'VideoController',
                controllerAs: 'vm'
            });
    }
})();