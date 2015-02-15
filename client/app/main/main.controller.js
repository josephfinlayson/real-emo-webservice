'use strict';

angular.module('realEmoWebserviceApp')
  .controller('MainCtrl', function ($scope, $http,$interval) {
  var emotions = {}

    $interval(function(){
      $http.get('/emotions').success(function(emotions) {

        $scope.emotions.allEmotions = emotions;
      });
    }, 5000);


  });
