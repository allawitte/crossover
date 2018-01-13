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
