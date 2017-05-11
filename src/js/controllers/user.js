angular
.module('artsy')
.controller('UsersIndexCtrl', UsersIndexCtrl)
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User', 'filterFilter', '$scope'];
function UsersIndexCtrl(User, filterFilter, $scope) {
  const vm = this;

  vm.all = User.query();
  function filterUser() {

    vm.filtered = filterFilter(vm.all, vm.q);
  }
  $scope.$watch(() => vm.q, filterUser);

  filterUser();
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

//new entry
function usersDelete() {
  vm.user
    .$remove()
    .then(() => $state.go('login'));
}

vm.delete = usersDelete;
}
// ********


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
