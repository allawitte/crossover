'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$state', '$rootScope', 'AuthService'];
    function LoginController($state, $rootScope, AuthService){
        var vm = this;
        vm.login = login;
        vm.afterLogin = afterLogin;
        vm.user = {};
        vm.setSessionId = setSessionId;

        function login(){
            AuthService.logIn(vm.user)
                .then(setSessionId)
                .then(afterLogin)
        }
        
        function setSessionId(response){
            var sessionId = response.data.sessionId;
            localStorage.setItem("sessionId", sessionId);
            $rootScope.sessionId = sessionId;
            return sessionId;
        }

        function afterLogin(sessionId){
            if(sessionId){
                vm.loginError = false;
                $state.go('/home.videos',  {
                    sessionId: sessionId
                })
            }
            else {
                vm.loginError = true;
            }
        }


    }
})();
/**
 * Created by HP on 1/8/2018.
 */
