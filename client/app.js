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
'use strict';
(function () {

    angular
        .module('app')
        .factory('AuthService', AuthService);
    AuthService.$inject = ['$http'];
    function AuthService($http) {

        var service = {};
        service.logIn = logIn;
        service.logOut = logOut;
        return service;
        
        function logIn(user){
            user.password = md5(user.password);
            return $http.post('user/auth', user)
        }
        
        function logOut(sessionId){
            return $http.get('user/logout?sessionId='+sessionId);
        }
    }
})();
/**
 * Created by HP on 1/11/2018.
 */

'use strict';

(function () {

    angular
        .module('app')
        .factory('RatingHelper', RatingHelper);
    RatingHelper.$inject=['$http'];
    function RatingHelper($http) {

        var service = {};
        service.getWidth = getWidth;
        service.submitRating = submitRating;
        return service;

        function getWidth(video){
            var rating = video.ratings.reduce(function(previousValue, currentValue) {
                    return previousValue + currentValue;
                })/video.ratings.length * 100/5;
            return 'width: '+ rating + '%;';
        }
        
        function submitRating(videoId, sessionId, rating){
            var ratingData = {
                videoId: videoId,
                rating: rating
            };
            $http.post('video/ratings?&sessionId='+sessionId, ratingData)
                .then(function(res){
                    console.log(res);
                });
        }
    }
})();
/**
 * Created by HP on 1/10/2018.
 */

'use strict';
'use strict';

(function () {

    angular
        .module('app')
        .factory('VideoHelper', VideoHelper);
    VideoHelper.$inject = ['$http'];
    function VideoHelper($http) {

        var service = {};
        service.getFirstVideos = getFirstVideos;
        service.getNextVideos = getNextVideos;
        service.isPageBottom = isPageBottom;
        service.getOneVideo = getOneVideo;
        return service;

        function getFirstVideos(sessionId) {
            return $http.get('videos?sessionId=' + sessionId+'&limit=12');
        }

        function getNextVideos(sessionId, skip, limit) {
            return $http.get('videos?sessionId=' + sessionId + '&skip=' + skip + '&limit=' + limit)
        }

        function isPageBottom(window) {
            if (document.body.clientHeight - window.scrollY <=window.innerHeight+2) {
                return true;
            }
        }

        function getOneVideo(videoId, sessionId){
            return $http.get('video?videoId='+ videoId + '&sessionId='+sessionId)
        }
    }
})();
/**
 * Created by HP on 1/10/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$rootScope', 'AuthService', '$state'];
    function HomeController($rootScope, AuthService, $state) {
        $rootScope.sessionId = localStorage.getItem("sessionId");
        var vm = this;
        vm.collapse = 'collapse';
        vm.toggleMenu = toggleMenu;
        vm.logOut = logOut;
        vm.removeSessionId = removeSessionId;

        function toggleMenu() {
            vm.collapse = vm.collapse ? '' : 'collapse';
        }

        function logOut() {
            AuthService.logOut($rootScope.sessionId)
                .then(function (res) {
                    vm.removeSessionId()
                    $state.go('/home.login');
                })
        }

        function removeSessionId(){
            $rootScope.sessionId = '';
            localStorage.removeItem('sessionId');
        }
    }
})();
/**
 * Created by HP on 1/8/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', '$rootScope', 'AuthService'];
    function LoginController($state, $rootScope, AuthService){
        var vm = this;
        vm.login = login;
        vm.afterLogin = afterLogin;
        vm.user = {};
        vm.setSessionId = setSessionId;

        function login(){
            AuthService.logIn(vm.user)
                .then(setSessionId)
                .then(afterLogin)
        }
        
        function setSessionId(response){
            var sessionId = response.data.sessionId;
            localStorage.setItem("sessionId", sessionId);
            $rootScope.sessionId = sessionId;
            return sessionId;
        }

        function afterLogin(sessionId){
            if(sessionId){
                vm.loginError = false;
                $state.go('/home.videos',  {
                    sessionId: sessionId
                })
            }
            else {
                vm.loginError = true;
            }
        }


    }
})();
/**
 * Created by HP on 1/8/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('VideoController', VideoController);
    VideoController.$inject = ['$stateParams', 'RatingHelper', 'VideoHelper', '$scope'];
    function VideoController($stateParams, RatingHelper, VideoHelper, $scope){
        var vm = this;
        vm.sessionId = $stateParams.sessionId;
        vm.videoId = $stateParams.videoId;
        vm.getWidth = getWidth;
        vm.rate = rate;
        vm.limit = 1;
        vm.skip = 10;
        vm.increaseSkip = increaseSkip;

        VideoHelper.getOneVideo(vm.videoId, vm.sessionId).
            then(function(res){
            $scope.video = res.data.data;
        });

        function getWidth(video){
            if(!video) {
                return;
            }
            video.ratingStyle = RatingHelper.getWidth(video);
        }

        function rate(videoId, rating){
            RatingHelper.submitRating(videoId, vm.sessionId, rating);
        }
        VideoHelper.getFirstVideos(vm.sessionId).then(function(res){
            vm.videos = res.data.data;
        });

        window.addEventListener('scroll', getMoreVideos(vm.skip, vm.limit, vm.sessionId));

        function  getMoreVideos (skip, limit, sessionId){
            return function(e){
                if (VideoHelper.isPageBottom(this)) {
                    VideoHelper.getNextVideos(sessionId, skip, limit)
                        .then(function(response) {
                            var videosArr = response.data.data;
                            videosArr.forEach(function(video){vm.videos.push(video)});
                            increaseSkip(skip, limit);
                        });
                }
            }
        }

        function increaseSkip(skip, limit){
            vm.skip = skip + limit;
        }


    }
})();
/**
 * Created by HP on 1/10/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('VideosController', VideosController);
    VideosController.$inject = ['$stateParams', 'RatingHelper', 'VideoHelper', '$state'];
    function VideosController($stateParams, RatingHelper, VideoHelper, $state) {
        var vm = this;
        vm.play = play;
        vm.getWidth = getWidth;
        vm.rate = rate;
        vm.skip = 12;
        vm.limit = 4;
        vm.sessionId = $stateParams.sessionId;
        vm.videos = [];
        vm.increaseSkip = increaseSkip;


        VideoHelper.getFirstVideos(vm.sessionId)
            .then(function (response) {
                vm.videos = response.data.data;
            })
            .catch(function () {
                    $state.go('/home.login');
                }
            )

        function increaseSkip() {
            vm.skip = vm.skip + vm.limit;
        }


        function play(e) {
            var video = document.querySelector('video[data-id="' + e + '"]');
            if (video.paused) {
                //stop any other played video
                var videos = Array.from(document.querySelectorAll('video'));
                videos.forEach(function (video) {
                    video.pause()
                });

                video.play();
            }
            else {
                video.pause();
            }
        }

        function rate(videoId, rating) {
            RatingHelper.submitRating(videoId, vm.sessionId, rating);
        }

        function getWidth(video) {
            video.ratingStyle = RatingHelper.getWidth(video);
        }

        //endless scroll
        window.addEventListener('scroll', getMoreVideos(vm.skip, vm.limit, vm.sessionId));

        function getMoreVideos(skip, limit, sessionId) {
            return function (e) {
                if (VideoHelper.isPageBottom(this)) {
                    VideoHelper.getNextVideos(sessionId, skip, limit)
                        .then(function (response) {
                            var videosArr = response.data.data;
                            videosArr.forEach(function (video) {
                                vm.videos.push(video)
                            });
                            vm.increaseSkip();
                        });
                }
            }
        }
    }
})();
/**
 * Created by HP on 1/8/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .directive('preloader', function(){
            return {
                templateUrl: 'directives/preloader/preloader.html',
                replace: true
            }
        })
})();
/**
 * Created by HP on 1/11/2018.
 */

'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .directive('rating', function(){
            return {
                templateUrl: 'directives/rating/rating.html',
                replace: true
            }
        })
})();
/**
 * Created by HP on 1/11/2018.
 */
