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
