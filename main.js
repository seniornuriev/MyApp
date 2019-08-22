var app = angular.module('app', ['ui.router', 'ngMockE2E']);

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

app.run(function ($httpBackend) {
  var items = [
    {
      name: 'item 1',
      date: '2019.12.21 18:46'
    },
    {
      name: 'item 2',
      date: '2018.12.21 18:46'
    }
  ];

  $httpBackend.whenGET('http://localhost:80/items').respond(200, items);

  $httpBackend.whenPOST('http://localhost:80/items').respond(function (method, url, data) {
    var result = JSON.parse(data);
    items.push(result);
    return [200, result];
  });


});

app.controller('mainCtrl', function ($http, $scope) {
  
  $scope.todayDate = new Date();
  $scope.sortField = 'date';

  $http.get('http://localhost:80/items')
    .success(function (result) {
      console.log('sucess', result);
      $scope.items = result;
    })
    .error(function (result) {
      console.log('error');
    });

  $scope.addItem = function (item, todayDate) {
    console.log(item, todayDate);
    var newitem = {
      name: item,
      date: todayDate
    }
    $http.post('http://localhost:80/items', newitem)
      .success(function (result) {
        console.log('item successfully saved to backend');
        $scope.items.push(newitem);
        $scope.newitem = null;
      })
      .error(function (result) {
        console.log('Error in item post');
      });
  };

  $scope.removeItem = function (item) {
    $http.post('http://localhost:80/items', item)
      .success(function (result) {
        console.log('item successfully removed from backend');
        var idx = $scope.items.indexOf(item);
        $scope.items.splice(idx, 1);
        })
      .error(function (result) {
        console.log('Error in item post');
      });
  };

});
