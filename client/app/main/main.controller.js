'use strict';

angular.module('epgameApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.npcs = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
    
    $http.get('/api/npcs').success(function(npcs) {
      $scope.npcs = npcs;
      socket.syncUpdates('npc', $scope.npcs);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };
    
    $scope.addNpc = function() {
      if($scope.newNpc === '') {
        return;
      }
      $http.post('/api/npcs', { name: $scope.newNpc });
      $scope.newNpc = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    
    $scope.deleteNpc = function(npc) {
      $http.delete('/api/npcs/' + npc._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('npcs');
    });
  });
