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
