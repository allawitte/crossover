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
