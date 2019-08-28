var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('editor',{
            url: '/',
            template: '<editor></editor>'
        })
        .state('preview',{
            url: '/preview',
            template: '<preview></preview>'
        })
        .state('test',{
          url: '/test',
          template: '<editor></editor>'
        })


    $urlRouterProvider.otherwise('index.html');
    $locationProvider.html5Mode({enabled: true,
      requireBase: false});

});

app.directive('editor', function () {

  function controller(taskService) {
    var vm = this;
    vm.items = taskService.getAllItem;

    moment('ru');
    vm.todayDate = moment();
    vm.items = taskService.getAllItem;

    vm.addItem = function (item) {
      console.log(item);
      var newitem = {
        name: item,
        date: vm.todayDate.format('DD.MM.YY, hh:mm'),
        hide: true
      }
      vm.items.push(newitem);
      vm.newItem = "";
    };

    vm.removeItem = function (index){
      vm.items.splice(index, 1);
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'editor.html',
    controller: controller,
    controllerAs: 'ctrl',
    scope: {}
  }

})

app.directive('preview', function () {

  function controller(taskService) {
    var vm = this;
    vm.items = taskService.getAllItem;

    vm.swapToTop = function(index) {
      var item = vm.items.splice(index, 1);
      item[0].hide = true;
      vm.items.unshift(item[0]);
    };

    vm.swapToBottom = function(index) {
      var item = vm.items.splice(index, 1);
      item[0].hide = true;
      vm.items.push(item[0]);
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'preview.html',
    controller: controller,
    controllerAs: 'ctrl',
    scope: {}
  }
})

app.service('taskService', function() {
  return {
      getAllItem: [
        {
          name: 'item 1',
          date: moment([2011, 9, 29, 18, 13]),
          hide: true
        },
        {
          name: 'item 2',
          date: moment([2011, 8, 30, 18, 14]),
          hide: true
        },
        {
          name: 'item 3',
          date: moment([2011, 7, 27, 18, 15]),
          hide: true
        },
        {
          name: 'item 4',
          date: moment([2011, 6, 26, 18, 16]),
          hide: true
        }
      ]
  }
})


