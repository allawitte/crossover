'use strict';
(function () {

    angular
        .module('app')
        .factory('AuthService', AuthService);
    AuthService.$inject = ['$http'];
    function AuthService($http) {

        var service = {};
        service.logIn = logIn;
        service.logOut = logOut;
        return service;
        
        function logIn(user){
            user.password = md5(user.password);
            return $http.post('user/auth', user)
        }
        
        function logOut(sessionId){
            return $http.get('user/logout?sessionId='+sessionId);
        }
    }
})();
/**
 * Created by HP on 1/11/2018.
 */
