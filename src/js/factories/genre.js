angular
  .module('artsy')
  .factory('Genre', Genre);

Genre.$inject = ['$resource', 'API_URL'];
function Genre($resource, API_URL) {
  return new $resource(`${API_URL}/genres/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
