angular
.module('artsy')
.controller('EventsIndexCtrl', EventsIndexCtrl)
.controller('EventsNewCtrl', EventsNewCtrl)
.controller('EventsShowCtrl', EventsShowCtrl)
.controller('EventsEditCtrl', EventsEditCtrl);

EventsIndexCtrl.$inject = ['Event', 'filterFilter', '$scope'];
function EventsIndexCtrl(Event, filterFilter, $scope) {
  const vm = this;

  vm.all = Event.query();

  function filterEvent() {
    vm.filtered = filterFilter(vm.all, vm.q);
  }
  $scope.$watch(() => vm.q, filterEvent);

  filterEvent();
}

EventsNewCtrl.$inject = ['Event', 'User', 'Genre', '$state'];
function EventsNewCtrl(Event, User, Genre, $state) {
  const vm = this;
  vm.event = {};
  vm.users = User.query();
  vm.genres = Genre.query();


  function eventsCreate() {
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', 'User', 'Genre','Comment', '$stateParams', '$state', '$auth', 'Etsy'];
function EventsShowCtrl(Event, User, Genre, Comment, $stateParams, $state, $auth, Etsy) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  Event.get($stateParams)
    .$promise
    .then((event) => {
      vm.event = event;
      searchProducts(event.genre.name);
    });

  function searchProducts(keywords) {
    Etsy.searchProducts(keywords)
      .then((results) => {
        vm.etsyResults = results;
        console.log(results[0]);
      });
  }

  vm.searchProducts = searchProducts;

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;

  function eventsUpdate() {
    Event
      .update({id: vm.event.id, event: vm.event });
  }

  function addComment() {
    vm.comment.event_id = vm.event.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.event.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.event.comments.indexOf(comment);
        vm.event.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function toggleAttending() {
    const index = vm.event.attendee_ids.indexOf(vm.currentUser.id);
    if (index > -1) {
      vm.event.attendee_ids.splice(index, 1);
      vm.event.attendees.splice(index, 1);
    }else {
      vm.event.attendee_ids.push(vm.currentUser.id);
      vm.event.attendees.push(vm.currentUser);
    }
    eventsUpdate();
  }
  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() && vm.event && vm.event.$resolved && vm.event.attendee_ids.includes(vm.currentUser.id) ;
  }

  vm.isAttending = isAttending;
}

EventsEditCtrl.$inject = ['Event', 'User', 'Genre','$stateParams', '$state'];
function EventsEditCtrl(Event, User, Genre, $stateParams, $state) {
  const vm = this;

  vm.genres = Genre.query();


  Event.get($stateParams).$promise.then((event) => {
    vm.event = event;
    vm.event.date = new Date(event.date);

  });

  vm.users = User.query();

  function eventsUpdate() {
    Event
      .update({id: vm.event.id, event: vm.event })
      .$promise
      // remove $stateparams if caused issues - see last LN
      .then(() => $state.go('eventsShow', $stateParams, { id: vm.event.id }));
  }

  vm.update = eventsUpdate;
}
