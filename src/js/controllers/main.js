angular
  .module('artsy')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isNavCollapsed = true;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;

    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
  });

  const protectedStates = ['eventsNew', 'eventsEdit', 'productsNew', 'productsEdit', 'usersShow', 'usersEdit'];

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
    vm.pageName = toState.name;
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;
}
