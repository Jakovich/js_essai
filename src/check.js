'use strict';

function getMessage(a, b) {

  switch (typeof a) {
    case "boolean":
      if (a) {
        var fireSuccesMessage = "Я попал в " + b;
        return fireSuccesMessage;
      } else {
        return "Я никуда не попал";
      }
      break;

    case "number":
      var jumpMessage = "Я прыгнул на " + a * 100 + " сантиметров";
      return jumpMessage;
      break;

    case "object":
      if (typeof b == "object") {
        /*если массивы разные по длине выбор самого короткого, чтобы не получить значение Nan*/
        var longestArr = a;
        var shortArr = b;
        if (b.length > a.length) {
          longestArr = b;
          shortArr = a;
        }
        var distanceCount = shortArr.reduce(function (sum, elem, i) {
          return (sum + (elem * longestArr[i]));
        }, 0);

        var distanceMessage = "Я прошёл " + distanceCount + " метров"
        return distanceMessage;
        
      } else {
        var stepCount = a.reduce(function(sum, current) {
          return sum + current;
        }, 0);
        var stepMessage = "Я прошёл " + stepCount + " шагов";
        return stepMessage;
      }
      break;
  };
};








