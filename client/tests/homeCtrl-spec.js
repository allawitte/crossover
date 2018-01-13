'use strict';
describe('app', function() {

    var $scope, ctrl, $rootScope;
    beforeEach(module('app'));
    beforeEach(inject(function( _$rootScope_, $controller){
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        ctrl = $controller('HomeController', {
            $rootScope: $rootScope,
            $scope: $scope
        })
    }));


    it('Initial session Id', function(){
        expect($rootScope.sessionId).toEqual(null);
    });

    it('Initial class name for mobile menu', function(){
        expect(ctrl.collapse).toEqual('collapse');
    });

    it('toggleMenu is changing value to "" from "collapse" ', function(){
        ctrl.toggleMenu();
        expect(ctrl.collapse).toEqual('');
        ctrl.toggleMenu();
        expect(ctrl.collapse).toEqual('collapse');
    });

    it('change rootScope.sessionId after log out', function(){
        ctrl.removeSessionId();
        expect($rootScope.sessionId).toEqual('');
    })

});


/**
 * Created by HP on 1/12/2018.
 */
