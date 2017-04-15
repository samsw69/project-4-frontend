angular
.module('artsy')
.controller('ProfileCtrl', ProfileCtrl);
// .controller('ProfilesNewCtrl', ProfilesNewCtrl)
// .controller('ProfilesShowCtrl', ProfilesShowCtrl)
// .controller('ProfilesEditCtrl', ProfilesEditCtrl);

ProfileCtrl.$inject = ['Profile'];
function ProfileCtrl(Profile) {
  const vm = this;

  vm.all = Profile.query();
}

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
// ProfilesShowCtrl.$inject = ['Profile', '$stateParams'];
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
// ProfilesEditCtrl.$inject = ['Profile', '$stateParams'];
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
