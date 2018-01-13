'use strict';
describe('LoginController', function(){
    var $scope, ctrl, $rootScope, http;
    beforeEach(module('app'));
    beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller){
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        
        ctrl = $controller('LoginController', {
            $rootScope: $rootScope,
            $scope: $scope
        });
    }));


    it('If sessionId is passed - it saved in root' +
        'scope', function(){
        ctrl.setSessionId({data: {sessionId:'jioiuu3oricw0eu9weq9wu098'}});
        expect($rootScope.sessionId).toEqual('jioiuu3oricw0eu9weq9wu098');
    });


    it('IIf log is successful ', function(){
        ctrl.afterLogin('124y23ih vkej23bv2i473284793');
        expect(ctrl.loginError).toEqual(false);
    });

    it('IIf log is not successful ', function(){
        ctrl.afterLogin('')
        expect(ctrl.loginError).toEqual(true);
    });
});
/**
 * Created by HP on 1/12/2018.
 */
