var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    'ui.router', 
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

});



app.controller('editorCtrl', function ($scope, taskService) {
  
  $scope.todayDate = new Date();
  $scope.sortField = 'date';

  $scope.items = taskService.getAllItem;

  $scope.addItem = function (item, todayDate) {
    console.log(item, todayDate);
    var newitem = {
      name: item,
      date: todayDate}
    $scope.items.push(newitem);
  };

  $scope.removeItem = function (item) {
    var idx = $scope.items.indexOf(item);
    $scope.items.splice(idx, 1);
  };

});


app.controller('previewCtrl', function ($scope, taskService) {
  $scope.items = taskService.getAllItem;
  $scope.hideMenu = false;

  $scope.swapItems = function(item, direction){
    var idx = $scope.items.indexOf(item);
    // $scope.hideMenu = !$scope.hideMenu;
    var newitem = {
      name: item.name,
      date: item.date}
    
    var swaps = function(item1, item2){
      if((item2 !== undefined)){
        newitem.name = item1.name; newitem.date = item1.date;
        item1.name = item2.name; item1.date = item2.date;
        item2.name = newitem.name; item2.date = newitem.date;
      }else{
        alert("Куда еще??");
      }
    }
    
    if(direction === "top"){
      swaps($scope.items[idx], $scope.items[idx-1]);
      console.log(idx);
    }else{
      swaps($scope.items[idx], $scope.items[++idx]);
      console.log(idx);
    }
  }
});

app.service('taskService', function() {
  return {
      getAllItem: [
        {
          name: 'item 1',
          date: '2019.12.21 18:46'
        },
        {
          name: 'item 2',
          date: '2018.12.21 18:46'
        }
      ]
  }
})


