angular
.module('artsy')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/static/home.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'js/views/profile.html',
    controller: 'ProfileCtrl as profile'
  })
  .state('productsIndex', {
    url: '/products',
    templateUrl: 'js/views/products/index.html',
    controller: 'ProductsIndexCtrl as productsIndex'
  })
  .state('productsNew', {
    url: '/products/new',
    templateUrl: 'js/views/products/new.html',
    controller: 'ProductsNewCtrl as productsNew'
  })
  .state('productsShow', {
    url: '/products/:id',
    templateUrl: 'js/views/products/show.html',
    controller: 'ProductsShowCtrl as productsShow'
  })
  .state('productsEdit', {
    url: '/products/:id/edit',
    templateUrl: 'js/views/products/edit.html',
    controller: 'ProductsEditCtrl as productsEdit'
  })
  .state('eventsIndex', {
    url: '/events',
    templateUrl: 'js/views/events/index.html',
    controller: 'EventsIndexCtrl as eventsIndex'
  })
  .state('eventsNew', {
    url: '/events/new',
    templateUrl: 'js/views/events/new.html',
    controller: 'EventsNewCtrl as eventsNew'
  })
  .state('eventsShow', {
    url: '/events/:id',
    templateUrl: 'js/views/events/show.html',
    controller: 'EventsShowCtrl as eventsShow'
  })
  .state('eventsEdit', {
    url: '/events/:id/edit',
    templateUrl: 'js/views/events/edit.html',
    controller: 'EventsEditCtrl as eventsEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'AuthCtrl as auth'
  })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    });

  $urlRouterProvider.otherwise('/');
}
