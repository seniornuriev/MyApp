var app = angular.module('app',[]); 

app.controller('itemList', function($scope){

    $scope.todayDate = new Date();

    $scope.items = [
        {'name': 'item',
         'date': new Date(2019, 01, 21, 23, 20)},
         
        {'name': 'item',
        'date' : new Date(2019, 01, 21, 23, 26)},

        {'name': 'item',
         'date': new Date(2019, 01, 21, 23, 24)},
    ];

    $scope.sortField = 'name';

    $scope.itemAdd = function(name, date){
        var newItem = {
            'name' : name,
            'date' : date
        };
        console.log(newItem);
        $scope.items.push(newItem);
    }

    $scope.removeItem = function(item){
        var idx = $scope.items.indexOf(item);
        console.log(idx);
        $scope.items.splice(idx, 1);
    }
});
