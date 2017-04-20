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
        if (!user.data.user.name || !user.data.user.username || !user.data.user.email || !user.data.user.about || !user.data.user.image_src) {
          $state.go('usersEdit', {id: user.data.user.id });
        } else {
          $state.go('usersIndex');
        }
      });
  }

  vm.authenticate = authenticate;
}
