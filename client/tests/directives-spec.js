'use strict';
describe('Testing directives', function(){
    var $scope, elem;
    beforeEach(module('app'));

    beforeEach(module('client/directives/preloader/preloader.html', 'client/directives/rating/rating.html'));

    beforeEach(inject(function($rootScope, $compile){
        elem = angular.element('<div><div preloader class="preloader-1"></div></div>');
        $scope = $rootScope;
        $compile(elem)($scope);
        $rootScope.$digest();
    }));

    it('Should contain span blocks', function(){
        // var spans = elem.find('span');
        // console.log('spans', spans);
    })
});
/**
 * Created by HP on 1/12/2018.
 */
