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

  vm.myInterval = 5000; // The time delay between each slide
  vm.noWrapSlides = false; // This will decide whether or not the carousel is 'infinite' or not, i.e whether you can keep going round in a loop with the arrow buttons
  vm.active = 3; // This decides which slide is shown first (based on it's index in the array of slides)

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
  // review - the next line was removed by AM
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
                // console.log(genre.id);
                // console.log(genreId);
                if (genreId === genre.id) {
                  console.log(vm.genres);
                  vm.genres.push(genre);
                  console.log(vm.genres);
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
