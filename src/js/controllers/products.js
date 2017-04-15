angular
.module('artsy')
.controller('ProductsIndexCtrl', ProductsIndexCtrl)
.controller('ProductsNewCtrl', ProductsNewCtrl)
.controller('ProductsShowCtrl', ProductsShowCtrl);
// .controller('ProductsEditCtrl', ProductsEditCtrl);

ProductsIndexCtrl.$inject = ['Product'];
function ProductsIndexCtrl(Product) {
  const vm = this;

  vm.all = Product.query();
}

ProductsNewCtrl.$inject = ['User', 'Product', '$state'];
function ProductsNewCtrl(User, Product, $state) {
  const vm = this;
  vm.event = {};
  vm.users = User.query();

  function productsCreate() {
    Product
      .save({ product: vm.product })
      .$promise
      .then(() => $state.go('productsIndex'));
  }

  vm.create = productsCreate;
}

ProductsShowCtrl.$inject = ['Product','User', '$stateParams', '$state', '$auth'];
function ProductsShowCtrl(Product, User, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.product = Product.get($stateParams);

  function productsDelete() {
    vm.product
      .$remove()
      .then(() => $state.go('productsIndex'));
  }

  vm.delete = productsDelete;

  // function productsUpdate() {
  //   Product
  //     .update({id: vm.product.id, product: vm.product });
  // }

  ProductsEditCtrl.$inject = ['Product', 'User', '$stateParams'];
  function ProductsEditCtrl(Product, User, $stateParams) {
    const vm = this;

    Product.get($stateParams).$promise.then((product) => {
      vm.product = product;
    });

    vm.users = User.query();
  }
}
