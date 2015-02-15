'use strict';

angular.module('realEmoWebserviceApp')
  .controller('MainCtrl', function ($scope, $http, $interval) {
    $scope.emotions = {}

    //$interval(function(){
    $http.get('/emotions').success(function (emotions) {
      console.log(emotions)
      var obj = {}
      $scope.emotions.labels = ['positive', 'negative']
      emotions.forEach(function (emote) {
        obj[emote.emotion.mood] = 0
        obj[emote.emotion.mood] += emote.duration || 0
        obj = [
          [65, 100],
        ];

      })
      $scope.emotions.allEmotions = obj;
    });
    //}, 5000);


  });
