angular
.module('artsy')
.controller('ProductsIndexCtrl', ProductsIndexCtrl)
.controller('ProductsNewCtrl', ProductsNewCtrl)
.controller('ProductsShowCtrl', ProductsShowCtrl)
.controller('ProductsEditCtrl', ProductsEditCtrl);

ProductsIndexCtrl.$inject = ['Product', 'filterFilter', '$scope'];
function ProductsIndexCtrl(Product, filterFilter, $scope) {
  const vm = this;

  vm.all = Product.query();

  function filterProduct() {
    vm.filtered = filterFilter(vm.all, vm.q);
  }
  $scope.$watch(() => vm.q, filterProduct);

  filterProduct();
}

ProductsNewCtrl.$inject = ['Product', 'User', 'Genre', '$state'];
function ProductsNewCtrl(Product, User, Genre, $state) {
  const vm = this;
  vm.product = {};
  vm.users = User.query();
  vm.genres = Genre.query();


  function productsCreate() {
    Product
      .save({ product: vm.product })
      .$promise
      .then(() => $state.go('productsIndex'));
  }

  vm.create = productsCreate;
}

ProductsShowCtrl.$inject = ['Product', 'User', 'Genre', '$stateParams', '$state', '$auth'];
function ProductsShowCtrl(Product, User, Genre, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });
  vm.genres = [];

  function getProductGenres() {
    Genre
      .query()
      .$promise
      .then((genres) => {
        Product
          .get($stateParams)
          .$promise
          .then((product) => {
            vm.product = product;
            vm.product.genre_ids.forEach((genreId) => {
              console.log(genres);
              genres.forEach((genre) => {
                if (genreId === genre.id) {
                  vm.genres.push(genre);
                }
              });
            });
          });
      });
  }
  getProductGenres();

  function productsDelete() {
    vm.product
      .$remove()
      .then(() => $state.go('productsIndex'));
  }

  vm.delete = productsDelete;
}

ProductsEditCtrl.$inject = ['Product', 'User', 'Genre',  '$stateParams', '$state'];
function ProductsEditCtrl(Product, User, Genre, $stateParams, $state) {
  const vm = this;

  vm.genres = Genre.query();


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
