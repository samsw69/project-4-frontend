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

// UsersNewCtrl.$inject = ['User', '$state'];
// function UsersNewCtrl(User, $state) {
//   const vm = this;
//   vm.users = User.query();
//
//   function submit() {
//     User.save(vm.user)
//     .$promise
//     .then(() => $state.go('usersIndex'));
//
//   }
//
//   vm.submit = submit;
//
// }

//****CHANGE THIS TO ENSURE USER CAN SHOW OWN PROFILE ONLY AND THEN EDIT IT ***********
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


//****CHANGE THIS TO ENSURE USER CAN SHOW OWN PROFILE ONLY AND THEN EDIT IT ***********
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
