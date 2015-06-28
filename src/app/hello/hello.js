import angular from 'angular';

export var hello = angular.module('app.hello', [])
  .controller('HelloController', ['$scope', function ($scope) {
        $scope.helloText = 'Hello, it works!';
    }
  ]);
