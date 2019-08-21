var app = angular.module('app',[]); 

app.controller('itemList', function($scope){

    $scope.todayDate = new Date();

    $scope.items = [
        {'name': 'item',
         'number': 9,
         'date': new Date(2019, 01, 21, 23, 20)},
         
        {'name': 'item',
        'number': 4,
        'date' : new Date(2019, 01, 21, 23, 26)},

        {'name': 'item',
         'number': 3,
         'date': new Date(2019, 01, 21, 23, 24)},
    ];

    $scope.sortField = 'date';

    $scope.itemCopy = function(name, number, date){
        
        
        var newItem = {
            'name' : name,
            'number' : number,
            'date' : date
        };
        console.log(newItem);
        $scope.items.push(newItem);
    }
});
