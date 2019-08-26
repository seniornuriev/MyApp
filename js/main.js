var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('editor',{
            url: '/',
            templateUrl: 'editor.html'
        })
        .state('preview',{
            url: '/preview',
            templateUrl: 'preview.html'
        })

    $urlRouterProvider.otherwise('index.html');
    $locationProvider.html5Mode({enabled: true,
      requireBase: false});

});



app.controller('editorCtrl', function ($scope, taskService) {
  
  $scope.todayDate = new Date();
  $scope.items = taskService.getAllItem;

  $scope.addItem = function (item, todayDate) {
    console.log(item, todayDate);
    var newitem = {
      name: item,
      date: todayDate,
      hide: true}
    $scope.items.push(newitem);
    $scope.newItem = "";
  };

  $scope.removeItem = function (idx){
    $scope.items.splice(idx, 1);
  };

});


app.controller('previewCtrl', function ($scope, taskService) {
  $scope.items = taskService.getAllItem;

  $scope.swapItems = function(item, idx, direction){
    var newitem = {
      name: item.name,
      date: item.date,
      hide: true
    }
    if(direction === "top"){
      $scope.items.splice(idx, 1);
      $scope.items.unshift(newitem);
    }else if(direction === "bottom"){
      $scope.items.splice(idx, 1);
      $scope.items[$scope.items.length] = newitem;
    }
  }
});

app.service('taskService', function() {
  return {
      getAllItem: [
        {
          name: 'item 1',
          date: "2019-01-16T18:32",
          hide: true
        },
        {
          name: 'item 2',
          date: "2019-04-16T18:30",
          hide: true
        },
        {
          name: 'item 3',
          date: "2019-05-16T18:30",
          hide: true
        },
        {
          name: 'item 4',
          date: "2019-06-16T18:30",
          hide: true
        }
      ]
  }
})


