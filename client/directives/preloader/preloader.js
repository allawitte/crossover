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
