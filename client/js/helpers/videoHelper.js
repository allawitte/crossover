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
