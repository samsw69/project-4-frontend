angular
.module('artsy')
.controller('UsersIndexCtrl', UsersIndexCtrl)
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', '$stateParams'];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;

  User
    .get($stateParams)
    .$promise
    .then(response => {
      vm.user = response;
    });
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  User.get($stateParams).$promise.then((user) => {
    vm.user = user;
  });

  vm.users = User.query();

  function usersUpdate() {
    User
      .update({id: vm.user.id, user: vm.user })
      .$promise
      .then(() => $state.go('usersIndex', $stateParams, { id: vm.user.id }));
  }

  vm.update = usersUpdate;
}
