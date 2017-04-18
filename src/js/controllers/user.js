angular
.module('artsy')
.controller('UsersIndexCtrl', UsersIndexCtrl)
// .controller('ProfilesNewCtrl', ProfilesNewCtrl)
// .controller('ProfilesShowCtrl', ProfilesShowCtrl)
// .controller('ProfilesEditCtrl', ProfilesEditCtrl)
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

UsersShowCtrl.$inject = ['User', 'User', '$stateParams'];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;

  User
    .get($stateParams)
    .$promise
    .then(response => {
      vm.user = response;
    });
}

UsersEditCtrl.$inject = ['User', 'User', '$stateParams'];
function UsersEditCtrl(User, $stateParams) {
  const vm = this;

  User
    .get($stateParams)
    .$promise
    .then(response => {
      vm.user = response;
    });

  vm.edit = () => {
    User
    .update($stateParams, vm.user);
  };
}




//
//
//
// ProfileCtrl.$inject = ['Profile'];
// function ProfileCtrl(Profile) {
//   const vm = this;
//
//   vm.all = Profile.query();
// }
//
// ProfilesNewCtrl.$inject = ['User', 'Profile', '$state'];
// function ProfilesNewCtrl(User, Profile, $state) {
//   const vm = this;
//   vm.users = User.query();
//
//   function submit() {
//     Profile.save(vm.profile)
//     .$promise
//     .then(() => $state.go('profilesIndex'));
//
//   }
//
//   vm.submit = submit;
//
// }
//
// ProfilesShowCtrl.$inject = ['User', 'Profile', '$stateParams'];
// function ProfilesShowCtrl(Profile, $stateParams) {
//   const vm = this;
//
//   Profile
//     .get($stateParams)
//     .$promise
//     .then(response => {
//       vm.profile = response;
//     });
// }
//
// ProfilesEditCtrl.$inject = ['User', 'Profile', '$stateParams'];
// function ProfilesEditCtrl(Profile, $stateParams) {
//   const vm = this;
//
//   Profile
//     .get($stateParams)
//     .$promise
//     .then(response => {
//       vm.profile = response;
//     });
//
//   vm.edit = () => {
//     Profile
//     .update($stateParams, vm.profile);
//   };
// }