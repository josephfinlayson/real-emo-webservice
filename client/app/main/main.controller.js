'use strict';

angular.module('realEmoWebserviceApp')
  .controller('MainCtrl', function ($scope, $http, $interval, $stateParams) {
    $scope.emotions = {}


    //debugger;
    //$interval(function(){
    function calcEmotions() {

      $http.get('/emotions').success(function (emotions) {
        console.log(emotions)
        var obj = []
        var posDur = 0;
        var negDur = 0;

        $scope.emotions.labels = ['positive', 'negative']
        console.log(emotions)

        emotions.forEach(function (emote) {
          if (emote.duration && emote.username === $stateParams.userID) {
            if (emote.emotion.mood === 'positive' || 'POSITIVE') {
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
      })
    }

    $interval(calcEmotions()
      , 200)

    //}, 5000);


  });
