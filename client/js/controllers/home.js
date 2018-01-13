'use strict';
(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['$rootScope', 'AuthService', '$state'];
    function HomeController($rootScope, AuthService, $state) {
        $rootScope.sessionId = localStorage.getItem("sessionId");
        var vm = this;
        vm.collapse = 'collapse';
        vm.toggleMenu = toggleMenu;
        vm.logOut = logOut;
        vm.removeSessionId = removeSessionId;

        function toggleMenu() {
            vm.collapse = vm.collapse ? '' : 'collapse';
        }

        function logOut() {
            AuthService.logOut($rootScope.sessionId)
                .then(function (res) {
                    vm.removeSessionId()
                    $state.go('/home.login');
                })
        }

        function removeSessionId(){
            $rootScope.sessionId = '';
            localStorage.removeItem('sessionId');
        }
    }
})();
/**
 * Created by HP on 1/8/2018.
 */
