angular
  .module('artsy', ['ui.router', 'ngResource', 'satellizer', 'ngMessages', 'checklist-model'])
  .constant('API_URL', 'http://localhost:3000/api');
