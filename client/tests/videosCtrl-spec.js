'use strict';
describe('app', function() {

    var $scope, ctrl, $rootScope;
    beforeEach(module('app'));
    beforeEach(inject(function (_$rootScope_, $controller) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        ctrl = $controller('VideosController', {
            $rootScope: $rootScope,
            $scope: $scope
        })
    }));

    it('Skip for the nest videos download should be 12', function(){
        expect(ctrl.skip).toEqual(12);
    });

    it('Limit for the nest videos download should be 4', function(){
        expect(ctrl.limit).toEqual(4);
    });

    it('Initial value of vm.videos', function(){
        expect(ctrl.videos).toEqual([]);
    });

    it('Skip increses on 4 after one download', function(){
        ctrl.increaseSkip();
        expect(ctrl.skip).toEqual(16);
    })

});
/**
 * Created by HP on 1/12/2018.
 */
