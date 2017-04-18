angular
  .module('artsy')
  .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state'];
function AuthCtrl($auth, $state) {
  const vm = this;

  function register(){
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.register = register;

  function login(){
    $auth.login(vm.credentials)
    .then(() => $state.go('home'));
  }

  vm.login = login;

  function authenticate(provider) {
    $auth.authenticate(provider)
      // .then(() => $state.go('profile'));
      .then((user) => {
        console.log(user);
        $state.go('usersShow', {id: user.data.user.id });
      });
  }

  vm.authenticate = authenticate;
}
