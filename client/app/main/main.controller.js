'use strict';

angular.module('realEmoWebserviceApp')
  .controller('MainCtrl', function ($scope, $http, $interval) {
    $scope.emotions = {}

    //$interval(function(){
    $http.get('/emotions').success(function (emotions) {
      console.log(emotions)
      var obj = []
      var posDur = 0;
      var negDur = 0;

      $scope.emotions.labels = ['positive', 'negative']
      console.log(emotions)
      //debugger;
      function calcEmotions() {

        emotions.forEach(function (emote) {
          if (emote.duration) {
            if (emote.emotion.mood === 'positive') {
              posDur += emote.duration
            }
            else {
              negDur += emote.duration
            }
          }

        })

        obj.push(posDur)
        obj.push(negDur)

        obj = [obj]

        $scope.emotions.allEmotions = obj;
      }

    });
    //}, 5000);


  });
