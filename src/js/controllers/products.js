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

ProductsShowCtrl.$inject = ['Product', 'User', '$stateParams', '$state', '$auth'];
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
}

ProductsEditCtrl.$inject = ['Product', 'User', '$stateParams', '$state'];
function ProductsEditCtrl(Product, User, $stateParams, $state) {
  const vm = this;

  Product.get($stateParams).$promise.then((product) => {
    vm.product = product;
  });

  vm.users = User.query();

  function productsUpdate() {
    Product
      .update({id: vm.product.id, product: vm.product })
      .$promise
      .then(() => $state.go('productsShow', $stateParams, { id: vm.product.id }));
  }

  vm.update = productsUpdate;
}
