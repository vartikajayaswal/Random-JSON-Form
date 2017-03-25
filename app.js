var app = angular.module('randomForm',[]);

app.controller("formController",['$scope','$http', function($scope,$http){
    $scope.click= function(){
        $scope.key = {};
    $http.get('https://randomform.herokuapp.com/').then(function(response){
        $scope.key.val = response.data.data;
        var str = JSON.stringify(response.data.data, null, 2);
        $scope.key.val.field = str;
    });
    }
        
    $scope.submit = function(){
        var req = {
            method: 'POST',
            url: 'https://randomform.herokuapp.com/submit',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.key.val.field
        }
        $http(req).then(function(response){
            var retStr = JSON.stringify(response.data, null, 2);
            $scope.key.capture = retStr;
            $http.get('https://randomform.herokuapp.com/').then(function(response){
                $scope.key.val = response.data.data;
                var str = JSON.stringify(response.data.data, null, 2);
                $scope.key.val.field = str;
            });
        });
    }

}]);
