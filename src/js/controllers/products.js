angular
.module('artsy')
.controller('ProductsIndexCtrl', ProductsIndexCtrl)
.controller('ProductsNewCtrl', ProductsNewCtrl)
.controller('ProductsShowCtrl', ProductsShowCtrl)
.controller('ProductsEditCtrl', ProductsEditCtrl);

ProductsIndexCtrl.$inject = ['Product'];
function ProductsIndexCtrl(Product) {
  const vm = this;

  vm.all = Product.query();
}

ProductsNewCtrl.$inject = ['Product', 'User', '$state'];
function ProductsNewCtrl(Product, User, $state) {
  const vm = this;
  vm.product = {};
  vm.users = User.query();


  function productsCreate() {
    Product
      .save({ product: vm.product })
      .$promise
      .then(() => $state.go('productsIndex'));
  }

  vm.create = productsCreate;
}

ProductsShowCtrl.$inject = ['Product', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function ProductsShowCtrl(Product, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.product = Product.get($stateParams);

  function productsDelete() {
    vm.product
      .$remove()
      .then(() => $state.go('productsIndex'));
  }

  vm.delete = productsDelete;

  function productsUpdate() {
    Product
      .update({id: vm.product.id, product: vm.product });
  }

  function addComment() {
    vm.comment.product_id = vm.product.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.product.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  // function deleteComment(comment) {
  //   Comment
  //     .delete({ id: comment.id })
  //     .$promise
  //     .then(() => {
  //       const index = vm.product.comments.indexOf(comment);
  //       vm.product.comments.splice(index, 1);
  //     });
  // }
  //
  // vm.deleteComment = deleteComment;

  // function toggleAttending() {
  //   const index = vm.product.attendee_ids.indexOf(vm.currentUser.id);
  //   if (index > -1) {
  //     vm.product.attendee_ids.splice(index, 1);
  //     vm.product.attendees.splice(index, 1);
  //   }else {
  //     vm.product.attendee_ids.push(vm.currentUser.id);
  //     vm.product.attendees.push(vm.currentUser);
  //   }
  //   productsUpdate();
  // }
  // vm.toggleAttending = toggleAttending;

  // function isAttending() {
  //   return $auth.getPayload() && vm.product.$resolved && vm.product.attendee_ids.includes(vm.currentUser.id) ;
  // }
  //
  // vm.isAttending = isAttending;
}

ProductsEditCtrl.$inject = ['Product', 'User', '$stateParams', '$state'];
function ProductsEditCtrl(Product, User, $stateParams, $state) {
  const vm = this;

  Product.get($stateParams).$promise.then((product) => {
    vm.product = product;
    vm.product.date = new Date(product.date);
  });

  vm.users = User.query();

  function productsUpdate() {
    Product
      .update({id: vm.product.id, product: vm.product })
      .$promise
      .then(() => $state.go('productsShow', { id: vm.product.id }));
  }

  vm.update = productsUpdate;
}
