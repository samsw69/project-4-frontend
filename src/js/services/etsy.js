angular
  .module('artsy')
  .service('Etsy', Etsy);

Etsy.$inject = ['$http', 'API_URL'];
function Etsy($http, API_URL) {
  const vm = this;

  function searchProducts(genre) {
    return $http
      .get(`${API_URL}/search`, { params: { keywords: genre } })
      .then((response) => {
        return response.data.results;
      });
  }
  vm.searchProducts = searchProducts;

}
