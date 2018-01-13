'use strict';
describe('app', function() {

    var $scope, ctrl, $rootScope;
    beforeEach(module('app'));
    beforeEach(inject(function (_$rootScope_, $controller) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        ctrl = $controller('VideoController', {
            $rootScope: $rootScope,
            $scope: $scope
        })
    }));

    it('Skip for the nest videos download should be 12', function(){
        expect(ctrl.skip).toEqual(10);
    });

    it('Limit for the nest videos download should be 4', function(){
        expect(ctrl.limit).toEqual(1);
    });


    it('Skip increses on 4 after one download', function(){
        ctrl.increaseSkip(10, 1);
        expect(ctrl.skip).toEqual(11);
    })

});
/**
 * Created by HP on 1/12/2018.
 */
